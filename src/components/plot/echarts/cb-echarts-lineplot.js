import * as echarts from "echarts/core";
const { DataFrame } = require("dataframe-js");

// import dataNursery from './DataNursery';

import ColorScale from "./ColorScales";
import { formSchema } from "./schemas/lineplot";

import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
]);

const template = document.createElement("template");
template.innerHTML = `
    <style>@import "./css/main.css";</style>

    <div class="cb-echart-lineplot relative w-full overflow-hidden" style="height:40vh;">
        <div class="cb-chart-container w-full h-full"></div>
        <cb-plot-modal class="absolute top-0"></cb-plot-modal>
        <cb-plot-sidebar class="absolute top-0"></cb-plot-sidebar>
    </div>
`;

class LinePlot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector(".cb-chart-container");
    // this.modal = this.shadowRoot.querySelector('cb-plot-modal');
    this.sidebar = this.shadowRoot.querySelector("cb-plot-sidebar");

    this.chart_ = echarts.init(this.element);
    this.data_ = [];
    this.columns_ = [];

    this.handleDataSetSelected = this.handleDataSetSelected.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.formSchema = formSchema;
  }

  static get observedAttributes() {
    // Create attributes from the Schema
    const attrs = ["hash", "fileName"];
    const schemaProperties = formSchema.properties;
    Object.keys(schemaProperties).forEach((key) => {
      attrs.push(key);
    });
    return attrs;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  handleFormSubmit(value) {
    console.log("aaa", value);
    Object.keys(value).forEach((key) => {
      this.setAttribute(key, value[key]);
    });
    this.render();
  }

  connectedCallback() {
    this.render();
    this.observeResize({
      animation: {
        duration: 500,
        easing: "cubicInOut",
      },
    });

    if (this.modal) {
      this.modal.callBack = this.handleFormSubmit;
      this.modal.schemaUI = this.formSchemaUI;
      this.modal.schema = this.formSchema;
    }

    if (this.sidebar) {
      this.sidebar.callBack = this.handleFormSubmit;
      this.sidebar.schemaUI = this.formSchemaUI;
      this.sidebar.schema = this.formSchema;
    }

    // Event coming from data source selector
    window.addEventListener("data-selected", this.handleDataSetSelected);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("data-selected", this.handleDataSetSelected);
  }

  handleDataSetSelected(event) {
    const { csvContent, csvDataRows, columns, hash, fileName } = event.detail;
    this.columns_ = columns;
    this.data_ = csvDataRows;
    this.hash = hash;
    this.fileName = fileName;

    this.setAttribute("hash", hash);
    this.setAttribute("fileName", fileName);

    this.updateFormSchema(columns);

    this.render();
  }

  updateFormSchema(columns) {
    const categoryColumnEnum = columns;
    const valueColumnEnum = columns;

    this.formSchema.properties["column-category"].enum = categoryColumnEnum;
    this.formSchema.properties["column-values"].enum = valueColumnEnum;

    if (this.modal) {
      this.modal.schema = this.formSchema;
    }
    if (this.sidebar) {
      this.sidebar.schema = this.formSchema;
    }
  }

  plotData(seriesName) {
    let columnCategory = this.getAttribute("column-category") || "";
    let columnsValues = this.getAttribute("column-values") || "";
    let aggregation = this.getAttribute("aggregation") || "";
    let lineType = this.getAttribute("line-style") || "";
    let simbolSize = this.getAttribute("simbol-size") || "";
    let showLabels = this.getAttribute("show-labels") || "";
    let smoothLine = this.getAttribute("line-type") || "";

    aggregation = aggregation === "" ? "none" : aggregation.toLowerCase();

    // let series = {
    //   type: "line",
    //   name: seriesName,
    //   data: [],
    //   style: {
    //     color: "black",
    //   },
    //   symbolSize: simbolSize,
    //   lineStyle: {
    //     type: lineType
    //   },
    // };

    let series = {
      type: "line",
      name: seriesName,
      data: [],
      smooth: smoothLine !== "normal", // Make the line smooth
      areaStyle: {}, // Add area fill
      symbolSize: simbolSize,
      lineStyle: {
        type: lineType,
      },
      label: {
        show: showLabels !== "false", // Show labels on markers
        position: "top", // Position the labels at the top of markers
        formatter: "{c}", // Format the labels to show the value
      },
    };

    // TODO: ADD LOGIC TO GET THE DATA IF THERE IS A HASH / FILENAME.
    if (!this.data_ || columnCategory === "" || columnsValues === "") {
      return series;
    }

    const validColumns = columnsValues
      .split(",")
      .filter((col) => this.columns_.includes(col));
    if (validColumns.length === 0) {
      return series;
    }

    this.df = new DataFrame(this.data_);

    //Clean the df before groupBY
    this.df = this.df.filter((row) => {
      return row
        .toArray()
        .every((value) => value !== null && value !== undefined);
    });

    const grouped = this.df.groupBy(columnCategory);

    const aggregations = {
      sum: (df, col) => df.stat.sum(col),
      mean: (df, col) => df.stat.mean(col),
      median: (df, col) => df.stat.median(col),
      count: (df, col) => df.count(),
      min: (df, col) => df.stat.min(col),
      max: (df, col) => df.stat.max(col),
    };

    const aggregatedData = grouped
      .aggregate((group) => {
        const result = {};
        validColumns.forEach((col) => {
          result[col] = aggregations[aggregation](group, col);
        });
        return result;
      })
      .toArray();

    const scale = ColorScale.getColorScale(
      this.getAttribute("color-scale") || "Viridis",
      this.getAttribute("color-primary") || "#000000",
      this.getAttribute("color-secundary") || "#ffffff",
      aggregatedData.length
    );

    const xAxisData = aggregatedData.map((item) => item[0]);

    series.data = aggregatedData.map((item, index) => {
      let value = item[1][validColumns[0]];
      if (value % 1 !== 0) {
        value = value.toFixed(2); // Round the value to two decimal places only if it has decimals
      }
      return {
        value: value,
        name: item[0],
        itemStyle: { color: scale(index) },
        //   percentage:
        //     ((item[1][validColumns[0]] / totalSum) * 100).toFixed(2) + "%", // Round the percentage to two decimal places
      };
    });

    return {
      series,
      xAxisData,
    };
  }

  updateOption() {
    let title = this.getAttribute("title") || "Line Plot";
    let xAxisLabel = this.getAttribute("x-axis-label") || "";
    let yAxisLabel = this.getAttribute("y-axis-label") || "";

    let subtitle = this.getAttribute("subtitle") || "";
    let legendPosition = this.getAttribute("legend-position") || "";
    let showBackground =
      this.getAttribute("show-background") === "true" || false;
    let seriesName = this.getAttribute("series-name") || "Series"; // Add a series name attribute

    const plotData = this.plotData(seriesName);
    let seriesData = plotData.series;
    const xAxisData = plotData.xAxisData;

    seriesData = { ...seriesData, showBackground: showBackground };

    this.option = {
      title: {
        text: title,
        subtext: subtitle,
        left: "center",
      },
      legend: {
        show: legendPosition !== "none",
        orient: "vertical",
        top: "15%",
        left: legendPosition,
      },
      tooltip: {
        trigger: "item",
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: "Save as Image",
            type: "png",
            backgroundColor: "#fff",
            pixelRatio: 2,
          },
        },
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        name: xAxisLabel,
      },
      yAxis: {
        name: yAxisLabel,
      },
      series: seriesData,
      animationDuration: 1000,
    };

    this.chart_.setOption(this.option);
  }

  render() {
    this.updateOption();
    this.chart_.resize({
      animation: {
        duration: 500,
        easing: "cubicInOut",
      },
    });
  }

  observeResize() {
    const resizeObserver = new ResizeObserver(() => {
      if (this.chart_) {
        this.chart_.resize({
          animation: {
            duration: 500,
            easing: "quadraticOut",
          },
        });
      }
    });

    resizeObserver.observe(this.element);
    this.resizeObserver = resizeObserver;

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (this.chart_) {
      this.chart_.resize({
        animation: {
          duration: 500,
          easing: "cubicInOut",
        },
      });
    }
  }
}

customElements.define("cb-echart-lineplot", LinePlot);
