// e-charts
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import {TitleComponent,TooltipComponent,GridComponent,DatasetComponent,TransformComponent, LegendComponent,ToolboxComponent} from "echarts/components";
echarts.use([ 
  PieChart, 
  TitleComponent, 
  TooltipComponent, 
  LegendComponent, 
  GridComponent, 
  DatasetComponent, 
  TransformComponent, 
  LabelLayout, 
  UniversalTransition, 
  CanvasRenderer, 
  ToolboxComponent]);

// DataScience
const { DataFrame } = require("dataframe-js");

// Utils and Form
import ColorScale from './utils/ColorScales';
import { formSchema ,initialValues } from './schemas/pieplot'

const template = document.createElement("template");
template.innerHTML = `
    <div class="cb-echart-pieplot cb-wc-height relative w-full overflow-hidden pt-2">
        <div class="cb-chart-container w-full h-full"></div>
        <cb-plot-sidebar allow-multiple-series="false" class="absolute top-0"></cb-plot-sidebar>
    </div>
`;

class PiePlot extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));

    this.element = this.querySelector(".cb-chart-container");
    this.sidebar = this.querySelector('cb-plot-sidebar');

    this.chart_ = echarts.init(this.element);
    
    this.data_ = [];
    this.columns_ = [];

    this.handleDataSetSelected = this.handleDataSetSelected.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.formSchema = formSchema;
    this.initialValues = initialValues;
  }

  static get observedAttributes() {
    const attrs = ["hash", "fileName"];
    const schemaProperties = formSchema.properties;
    Object.keys(schemaProperties).forEach((key) => {
      attrs.push(key);
    });
    return attrs;
  }

  hide() {
    this.main.classList.add('hidden');
    this.hidden = true;
  }

  show() {
      this.main.classList.remove('hidden');
      this.hidden = false;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  handleFormSubmit(value) {
    Object.keys(value).forEach(key => {
        if (key === 'dynamicForms') {
            value[key].forEach((item, index) => {
                Object.keys(item).forEach(subKey => {
                    this.setAttribute(`${subKey}-${index}`, item[subKey]);
                });
            });
        } else {
            this.setAttribute(key, value[key]);
        }
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
      this.sidebar.initialValues = this.initialValues;
      this.modal.callBack = this.handleFormSubmit;
      this.modal.schemaUI = this.formSchemaUI;
      this.modal.schema = this.formSchema;
    }

    if (this.sidebar) {
      this.sidebar.initialValues = this.initialValues;
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

    this.formSchema.properties.dynamicForms.items.properties['series-column-category'].enum = categoryColumnEnum;
    this.formSchema.properties.dynamicForms.items.properties['series-column-values'].enum = valueColumnEnum;
    

    if (this.modal) {
      this.modal.schema = this.formSchema;
    }
    if (this.sidebar) {
      this.sidebar.schema = this.formSchema;
    }
  }

  plotData(seriesName, columnCategory, columnsValues, aggregation, colorScale, primaryColor, secondaryColor) {
    let typePie = this.getAttribute("chart-pie-type") || "";
    
    aggregation = aggregation === "" ? "none" : aggregation.toLowerCase();

    // Style chart based on pie type
    let radius = typePie === "Ring" ? ["40%", "70%"] : "50%";
    let rose = typePie === "Rose" ? "area" : "";
    let startAngle = typePie === "Half Ring" ? 180 : 0;
    let center = typePie === "Half Ring" ? ['50%', '70%'] : ['50%', '50%'];

    let series = {
      type: "pie",
      name: seriesName,
      radius: radius,
      roseType: rose,
      center:center,
      data: [],
      style: {
        color: "black",
      },
      padAngle: 1,
      itemStyle: {
        borderRadius: 5
      },
      startAngle:startAngle,
      endAngle:360
    };

    if (typePie === "Ring") {
      series.itemStyle = {
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 2,
      };
    }

    if (typePie === "Rose") {
      (series.radius = ["15%", "80%"]),
        (series.itemStyle = {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        });
    }

    if (typePie === "Half Ring") {
      (series.radius = ['40%', '70%']),
        (series.itemStyle = {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        });
    }

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
    const grouped = this.df.groupBy(columnCategory);

    const aggregations = {
      "sum": (df, col) => df.stat.sum(col),
      "count": (df, col) => df.count(),
    };

    if (aggregation === 'none') {
      aggregation = 'sum'
  }

    let aggregatedData;
    aggregatedData = grouped.aggregate((group) => {
        const result = {};
        validColumns.forEach((col) => {
          result[col] = aggregations[aggregation](group, col);
        });
        return result;
      }).toArray();

    const totalSum = aggregatedData.reduce(
      (acc, item) => acc + item[1][validColumns[0]],
      0
    );

    const scale = ColorScale.getColorScale(
      colorScale || 'Viridis',
      primaryColor || '#000000',
      secondaryColor || '#ffffff',
      aggregatedData.length
  );

    series.data = series.data.filter(
      (item) =>
        !(item.value === 0(item.name === null || item.name === undefined))
    );

    series.data = aggregatedData.map((item, index) => ({
      value: item[1][validColumns[0]].toFixed(2),
      name: item[0],
      itemStyle: { color: scale(index) },
      percentage:
        ((item[1][validColumns[0]] / totalSum) * 100).toFixed(2) + "%",
    }));

    series.data = aggregatedData.map((item, index) => {
      let value = item[1][validColumns[0]];
      if (value % 1 !== 0) {
        value = value.toFixed(2); // Round the value to two decimal places only if it has decimals
      }
      return {
        value: value,
        name: item[0],
        itemStyle: { color: scale(index) },
        percentage:
          ((item[1][validColumns[0]] / totalSum) * 100).toFixed(2) + "%", // Round the percentage to two decimal places
      };
    });

    return {
      series,
    };
  }

  updateOption() {
    let title = this.getAttribute('chart-title') || "Pie Plot";
    let subtitle = this.getAttribute("chart-subtitle") || "";
    let seriesName = this.getAttribute("series-name") || "Series";
    // let legendPosition = this.getAttribute("legend-position") || "";
    let showPercentage = this.getAttribute("chart-show-percentage") === "show";
    let showBackground = this.getAttribute('chart-show-background') === 'show';
    let showCurrency = this.getAttribute('chart-show-currency') === 'show';
    let showLegend = this.getAttribute('chart-show-legend') === 'show';
    let chartPieType = this.getAttribute('chart-pie-type');

    let isSpecialType = chartPieType === 'Half Ring' || chartPieType === 'Rose';

    const seriesData = [];
    const xAxisData = new Set();
    
    // Helper function to get attribute by prefix and index
    const getAttributeByPrefixAndIndex = (prefix, index) => this.getAttribute(`${prefix}-${index}`) || '';

    // Series attributes series-xxxx-1
    let index = 0;
    while (true) {
        const seriesTitle = getAttributeByPrefixAndIndex('series-title', index);
        const columnCategory = getAttributeByPrefixAndIndex('series-column-category', index);
        const columnValues = getAttributeByPrefixAndIndex('series-column-values', index);
        const aggregation = getAttributeByPrefixAndIndex('series-aggregation', index);
        const seriesColorspace = getAttributeByPrefixAndIndex('series-colorspace', index);
        const seriesPrimaryColor = getAttributeByPrefixAndIndex('series-primary-color', index);
        const seriesSecondaryColor = getAttributeByPrefixAndIndex('series-secondary-color', index);

        if (!seriesTitle && !columnCategory && !columnValues && !aggregation) {
            break;
        }
        
        // Generate plot data for the current series
        const plotData = this.plotData(
            seriesTitle,
            columnCategory,
            columnValues,
            aggregation,
            seriesColorspace,
            seriesPrimaryColor,
            seriesSecondaryColor,
            showBackground
        );

        seriesData.push(plotData.series);
        index++;
    }

    this.option = {
      title: {
        text: title,
        subtext: subtitle,
        left: "center",
        textStyle: {
          fontFamily: "Poppins",
          fontWeight: "bold",
        },
        subtextStyle: {
          fontFamily: "Poppins"
        }
      },
      label: {
        formatter: "{b}: {c} ({d}%)",
        fontFamily:"Poppins",
      },
      legend: {
        show: showLegend,
        orient: "vertical",
        top: isSpecialType ? "10%" : "middle",
        left: 'left',
        type: "scroll",
        width: 100,
        height: 300
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: (params) =>
          `${params.name}: ${params.value.toLocaleString()}`
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore:{},
          saveAsImage: {
            title: "Save as Image",
            type: "png",
            backgroundColor: "#fff",
            pixelRatio: 2,
          },
        },
      },

      series: seriesData,
      animationDuration: 1000,
    };

    // Format label and tool tip depending up boolean selections
    if (showPercentage && showCurrency) {
      this.option.label.formatter = (params) =>
        `${params.name}: £${params.value.toLocaleString()} (${params.data.percentage})`;
      this.option.tooltip.formatter = (params) =>
        `${params.name}: £${params.value.toLocaleString()} (${params.data.percentage})`;
    } else if (showPercentage && !showCurrency){
      this.option.label.formatter = (params) =>
        `${params.name}: ${params.value.toLocaleString()} (${params.data.percentage})`;
      this.option.tooltip.formatter = (params) =>
        `${params.name}: ${params.value.toLocaleString()} (${params.data.percentage})`;
    } else if (!showPercentage && showCurrency){
      this.option.label.formatter = (params) =>
        `${params.name}: £${params.value.toLocaleString()}`;
      this.option.tooltip.formatter = (params) =>
        `${params.name}: £${params.value.toLocaleString()}`;
    }else {
      this.option.label.formatter = (params) =>
        `${params.name}: ${params.value.toLocaleString()}`;
      this.option.tooltip.formatter = (params) =>
        `${params.name}: ${params.value.toLocaleString()}`;
    }
    // Shifts plot across slightly if legend isnt shown to prevent overlap
    if (showLegend) {
      this.option.series.center = ['60%', '50%']
    }

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

  exportPNG() {
    if (this.chart_) {
        const url = this.chart_.getDataURL({
            type: 'png',
            backgroundColor: '#fff',
            pixelRatio: 2,
        });
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chart.png';
        a.click();
        a.remove();
    }
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

customElements.define("cb-echart-pieplot", PiePlot);
