//Line plot works with sum aggregation and with all customs settings


import * as echarts from "echarts/core";
const { DataFrame } = require("dataframe-js");

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
    this.sidebar = this.shadowRoot.querySelector("cb-plot-sidebar");

    this.chart_ = echarts.init(this.element);
    this.data_ = [];
    this.columns_ = [];

    this.handleDataSetSelected = this.handleDataSetSelected.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.formSchema = formSchema;
  }

  static get observedAttributes() {
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
    this.formSchema.properties["second-column-category"].enum = valueColumnEnum;

    if (this.modal) {
      this.modal.schema = this.formSchema;
    }
    if (this.sidebar) {
      this.sidebar.schema = this.formSchema;
    }
  }

  plotData(seriesName) {
    let columnCategory = this.getAttribute("column-category") || "";
    let second_columnCategory = this.getAttribute("second-column-category") || "";
    let columnsValues = this.getAttribute("column-values") || "";
    let aggregation = this.getAttribute("aggregation") || "sum";
    let lineType = this.getAttribute("line-style") || "";
    let symbolSize = parseInt(this.getAttribute("symbol-size") || 10);
    let showLabels = this.getAttribute("show-labels") || "";
    let smoothLine = this.getAttribute("line-type") || "";
    let plotType = this.getAttribute("line-plot-type") || "basic";

    const stackValue = plotType === "Stacked" ? "total" : "";

    if (!this.data_ || columnCategory === "" || columnsValues === "") {
      return null;
    }

    const validColumns = columnsValues.split(",").filter((col) => this.columns_.includes(col));
    if (validColumns.length === 0) {
      return null;
    }

    this.df = new DataFrame(this.data_);

    // Clean the df before groupBy
    this.df = this.df.filter((row) =>
      row.toArray().every((value) => value !== null && value !== undefined)
    );

    // Process data
    if (plotType === "Basic") {
      return this.plotBasic(columnCategory, columnsValues, seriesName, aggregation, lineType, symbolSize, showLabels, smoothLine);
    } else {
      return this.plotMultiOrStacked(columnCategory, second_columnCategory, columnsValues, seriesName, stackValue, lineType, symbolSize, showLabels, smoothLine);
    }
  }

  plotBasic(columnCategory, columnsValues, seriesName, aggregation, lineType, symbolSize, showLabels, smoothLine) {
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
        columnsValues.split(",").forEach((col) => {
          result[col] = aggregations[aggregation](group, col);
        });
        return result;
      })
      .toArray();

    const xAxisData = aggregatedData.map((item) => item[0]);

    const seriesData = {
      type: "line",
      name: seriesName,
      data: aggregatedData.map((item) => item[1][columnsValues]),
      smooth: smoothLine !== "normal",
      symbolSize: symbolSize,
      lineStyle: {
        type: lineType,
      },
      label: {
        show: showLabels !== "false",
        position: "top",
        formatter: "{c}",
      },
    };

    return {
      seriesData: [seriesData],
      xAxisData,
      seriesValues: [seriesName],
    };
  }

  plotMultiOrStacked(columnCategory, second_columnCategory, columnsValues, seriesName, stackValue, lineType, symbolSize, showLabels, smoothLine) {
    var xAxisValues = Array.from(
      new Set(
        this.df
          .toArray()
          .map((row) => row[this.columns_.indexOf(columnCategory)])
      )
    );
    var seriesValues = Array.from(
      new Set(
        this.df
          .toArray()
          .map((row) => row[this.columns_.indexOf(second_columnCategory)])
      )
    );
    var revenueData = {};

    // Initialize revenueData object
    seriesValues.forEach(function (series) {
      revenueData[series] = {};
      xAxisValues.forEach(function (x) {
        revenueData[series][x] = 0;
      });
    });

    // Populate revenueData
    this.df.toArray().forEach(function (row) {
      var series = row[this.columns_.indexOf(second_columnCategory)];
      var x = row[this.columns_.indexOf(columnCategory)];
      var revenue = row[this.columns_.indexOf(columnsValues)];
      revenueData[series][x] += revenue;
    }, this);

    // Prepare series data for ECharts
    var seriesData = seriesValues.map(function (series) {
      return {
        name: series,
        type: "line",
        stack: stackValue,
        smooth: smoothLine !== "normal",
        symbolSize: symbolSize,
        lineStyle: {
          type: lineType,
        },
        label: {
          show: showLabels !== "false",
          position: "top",
          formatter: "{c}",
        },
        data: xAxisValues.map(function (x) {
          return revenueData[series][x];
        }),
      };
    });

    return {
      seriesData,
      xAxisValues,
      seriesValues,
    };
  }

  updateOption() {
    let title = this.getAttribute("title") || "Line Plot";
    let xAxisLabel = this.getAttribute("x-axis-label") || "";
    let yAxisLabel = this.getAttribute("y-axis-label") || "";
    let subtitle = this.getAttribute("subtitle") || "";
    let legendPosition = this.getAttribute("legend-position") || "";
    let showBackground = this.getAttribute("show-background") === "true" || false;
    let seriesName = this.getAttribute("series-name") || "Series";

    const plotData = this.plotData(seriesName);
    if (!plotData) return;

    const { seriesData, xAxisValues, seriesValues } = plotData;

    this.option = {
      title: {
        text: title,
        subtext: subtitle,
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: seriesValues,
        show: legendPosition !== "none",
        orient: "vertical",
        top: "15%",
        left: legendPosition,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisValues,
        name: xAxisLabel,
      },
      yAxis: {
        type: "value",
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
