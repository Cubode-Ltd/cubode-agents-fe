import * as echarts from "echarts/core";
const { DataFrame } = require("dataframe-js");

import ColorScale from './utils/ColorScales';
import { formSchema, initialValues } from './schemas/lineplot'

import { LineChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LegendComponent, ToolboxComponent, DataZoomComponent} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([ LineChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer, LegendComponent, ToolboxComponent, DataZoomComponent]);

const template = document.createElement("template");
template.innerHTML = `
    <style>@import "dev/css/main.css";</style>

    <div class="cb-echart-lineplot cb-wc-height relative w-full overflow-hidden pt-2">
        <div class="cb-chart-container w-full h-full"></div>
        <cb-plot-sidebar class="absolute top-0"></cb-plot-sidebar>
    </div>
`;

class LinePlot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.main = this.shadowRoot.querySelector('.cb-echart-barplot');
    this.element = this.shadowRoot.querySelector('.cb-chart-container');
    this.modal = this.shadowRoot.querySelector('cb-plot-modal');
    this.sidebar = this.shadowRoot.querySelector('cb-plot-sidebar');

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
      this.modal.initialValues = this.initialValues;
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

  plotData(seriesName, columnCategory, columnsValues, aggregation, lineColor, areaColor, colorScale, primaryColor, secondaryColor, smoothLine, symbolSize, lineStyle, showArea, showLabels) {
    aggregation = aggregation === '' ? 'none' : aggregation.toLowerCase();
    showArea = showArea === 'show' ? true : false;
    showLabels = showLabels === 'show' ? true : false;
    smoothLine = smoothLine.toLowerCase() === 'smooth' ? true : false;
    areaColor = areaColor ? areaColor : '#3A9BDC'

    let series = {
      type: "line",
      name: seriesName,
      data: [],
      smooth: smoothLine, // Make the line smooth
      symbolSize: symbolSize,
      lineStyle: {
        type: lineStyle.toLowerCase(),
        color: lineColor || "#3A9BDC"
      },
      label: {
        show: showLabels, // Show labels on markers
        position: "top", // Position the labels at the top of markers
        formatter: "{c}", // Format the labels to show the value
      },
      areaStyle: {
        color: showArea ? areaColor : 'rgba(255,255,255,0)'
      }
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

    const grouped = this.df.groupBy(columnCategory);

    const aggregations = {
      sum: (df, col) => df.stat.sum(col),
      mean: (df, col) => df.stat.mean(col),
      median: (df, col) => df.stat.median(col),
      count: (df, col) => df.count(),
      min: (df, col) => df.stat.min(col),
      max: (df, col) => df.stat.max(col),
    };

    if (aggregation === 'none') {
      aggregation = 'sum'
    }

    let aggregatedData;
    aggregatedData = grouped.aggregate(group => {
        const result = {};
        validColumns.forEach(col => {
          result[col] = aggregations[aggregation](group, col);
        });
        return result;
      }).toArray();

    const scale = ColorScale.getColorScale(
      colorScale || 'Viridis',
      primaryColor || '#000000',
      secondaryColor || '#ffffff',
      aggregatedData.length
    );

    const xAxisData = aggregatedData.map((item) => item[0]);

    series.data = aggregatedData.map((item, index) => {
      let value = item[1][validColumns[0]];
      if (value % 1 !== 0) {
        value = value.toFixed(2);
      } 
      return {
        value: value,
        name: item[0],
        itemStyle: { color: scale(index) },

      };
    });

    return {
      series,
      xAxisData,
    };
  }

  updateOption() {
    let title = this.getAttribute("chart-title") || "Line Plot";
    let xAxisLabel = this.getAttribute("chart-x-axis-label") || "";
    let yAxisLabel = this.getAttribute("chart-y-axis-label") || "";
    let subtitle = this.getAttribute("chart-subtitle") || "";
    let showDataZoom = this.getAttribute('chart-show-zoom') === 'show';
    let showLegend = this.getAttribute('chart-show-legend') === 'show';

    const seriesData = [];
    const xAxisData = [];

    const getAttributeByPrefixAndIndex = (prefix, index) => this.getAttribute(`${prefix}-${index}`) || '';

    // Series attributes series-xxxx-1
    let index = 0;
    while (true) {
        const seriesTitle = getAttributeByPrefixAndIndex('series-title', index);
        const columnCategory = getAttributeByPrefixAndIndex('series-column-category', index);
        const columnValues = getAttributeByPrefixAndIndex('series-column-values', index);
        const aggregation = getAttributeByPrefixAndIndex('series-aggregation', index);
        const seriesLineColor = getAttributeByPrefixAndIndex('series-color-line', index);
        const seriesAreaColor = getAttributeByPrefixAndIndex('series-color-area', index);
        const seriesColorspace = getAttributeByPrefixAndIndex('series-colorspace-marker', index);
        const seriesPrimaryColor = getAttributeByPrefixAndIndex('series-primary-color-marker', index);
        const seriesSecondaryColor = getAttributeByPrefixAndIndex('series-secondary-color-marker', index);
        const seriesLineType = getAttributeByPrefixAndIndex('series-line-type', index);
        const seriesSymbolSize = getAttributeByPrefixAndIndex('series-symbol-size', index);
        const seriesLineStyle = getAttributeByPrefixAndIndex('series-line-style', index);
        const seriesArea = getAttributeByPrefixAndIndex('series-show-area', index);
        const seriesLabels = getAttributeByPrefixAndIndex('series-show-labels', index);

        


        if (!seriesTitle || !columnCategory || !columnValues) {
            break;
        }
        
        // Generate plot data for the current series
        const plotData = this.plotData(
            seriesTitle,
            columnCategory,
            columnValues,
            aggregation,
            seriesLineColor,
            seriesAreaColor,
            seriesColorspace,
            seriesPrimaryColor,
            seriesSecondaryColor,
            seriesLineType, 
            seriesSymbolSize, 
            seriesLineStyle,
            seriesArea,
            seriesLabels
        );

        seriesData.push(plotData.series);
        if (index === 0){
          xAxisData.push(...plotData.xAxisData);

        }
        index++;
    }

    this.option = {
      title: {
        text: title,
        subtext: subtitle,
        left: "center",
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        show: showLegend,
        orient: "horizontal",
        top: "30",
        right: '100',
        itemStyle: {
          color: "#1E395C"
        }
      },
      dataZoom: [
        {
          type: 'slider',
          show: showDataZoom,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          backgroundColor: "rgba(0, 0, 0, 0)",
            dataBackground: {
              areaStyle: {
                color: "#80A5D6"
                },
              lineStyle: {
                color: '#1E395C'
              }
            },
          bottom: 10,
          height: 20
          },
        {
          type: 'slider',
          show: showDataZoom,
          yAxisIndex: [0],
          left: '93%',
          start: 0,
          end: 100,
          backgroundColor: "rgba(0, 0, 0, 0)",
            dataBackground: {
              areaStyle: {
                color: "#80A5D6"
                },
              lineStyle: {
                color: '#1E395C'
              }
            }
          },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          yAxisIndex: [0],
          start: 0,
          end: 100
        }
      ] ,
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
            emphasis: {
              iconStyle: {
                textPosition: 'left'
              }
            }
          },
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
        axisLabel: {interval: 0, rotate: 30},
        axisTick: { alignWithLabel: true}
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