import * as echarts from "echarts/core";
const { DataFrame } = require("dataframe-js");

import ColorScale from './utils/ColorScales';
import { formSchema, initialValues } from "./schemas/scatterplot";
import { ScatterChart } from "echarts/charts";

import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LegendComponent, ToolboxComponent, DataZoomComponent} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([ ScatterChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer, LegendComponent, ToolboxComponent, DataZoomComponent]);

const template = document.createElement("template");
template.innerHTML = `
    <style>@import "css/main.css";</style>

    <div class="cb-echart-scatterplot cb-wc-height relative w-full overflow-hidden pt-2">
        <div class="cb-chart-container w-full h-full"></div>
        <cb-plot-sidebar class="absolute top-0 z-50"></cb-plot-sidebar>
    </div>
`;

class ScatterPlot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.main = this.shadowRoot.querySelector('.cb-echart-scatterplot');
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

    this.formSchema.properties.dynamicForms.items.properties['series-column-xaxis'].enum = categoryColumnEnum;
    this.formSchema.properties.dynamicForms.items.properties['series-column-yaxis'].enum = valueColumnEnum;
    

    if (this.modal) {
      this.modal.schema = this.formSchema;
    }
    if (this.sidebar) {
      this.sidebar.schema = this.formSchema;
    }
  }
  // showBackground
  plotData(seriesName, columnCategory, columnsValues, aggregation, colorScale, primaryColor, secondaryColor, seriesSymbolSize, showLabels) {
    aggregation = aggregation === "" ? "none" : aggregation.toLowerCase();

    // let columnCategory = this.getAttribute("column-category") || "";
    // let columnsValues = this.getAttribute("column-values") || "";
    // let aggregation = this.getAttribute("aggregation") || "";
    // let symbolSize = this.getAttribute("symbol-size") || "";
    // let showLabels = this.getAttribute("show-labels") || "";


    let series = {
      type: "scatter",
      name: seriesName,
      data: [],
      style: {
        color: "black",
      },
      symbolSize: seriesSymbolSize,
      label: {
        show: showLabels, // Show labels on markers
        position: "top", // Position the labels at the top of markers
        formatter: "{c}", // Format the labels to show the value
      },
    };

    // TODO: ADD LOGIC TO GET THE DATA IF THERE IS A HASH / FILENAME.
    if (!this.data_ || columnCategory === "" || columnsValues === "") {
      return series;
    }

    const validColumns = columnsValues.split(",").filter((col) => this.columns_.includes(col));
    if (validColumns.length === 0) {
      return series;
    }

    this.df = new DataFrame(this.data_);

    let rawData = this.df
      .toArray()
      .map((row) => [
        row[this.columns_.indexOf(columnCategory)],
        row[this.columns_.indexOf(validColumns[0])],
      ]);

    rawData.sort((a, b) => a[0] - b[0]);
    series.data = rawData;

    const scale = ColorScale.getColorScale(
      colorScale || 'Viridis',
      primaryColor || '#000000',
      secondaryColor || '#ffffff',
      rawData.length
    );

    series.data = rawData.map((item, index) => ({
      value: item,
      itemStyle: { color: scale(index) },
    }));

    // }
    //   } else {
    //     const grouped = this.df.groupBy(columnCategory);

    //     const aggregations = {
    //       sum: (df, col) => df.stat.sum(col),
    //       mean: (df, col) => df.stat.mean(col),
    //       median: (df, col) => df.stat.median(col),
    //       min: (df, col) => df.stat.min(col),
    //       max: (df, col) => df.stat.max(col),
    //     };

    //     const aggregatedData = grouped
    //       .aggregate((group) => {
    //         const result = {};
    //         validColumns.forEach((col) => {
    //           result[col] = aggregations[aggregation](group, col);
    //         });
    //         return result;
    //       })
    //       .toArray();

    //     const scale = ColorScale.getColorScale(
    //       this.getAttribute("color-scale") || "Viridis",
    //       this.getAttribute("color-primary") || "#000000",
    //       this.getAttribute("color-secundary") || "#ffffff",
    //       aggregatedData.length
    //     );

    //     const xAxisData = aggregatedData.map((item) => item[0]);

    //     series.data = aggregatedData.map((item, index) => ({
    //       value: item[1][validColumns[0]],
    //       name: item[0],
    //       itemStyle: { color: scale(index) },
    //     }));
    //   }

    // // in here should be done a if statement where the user checks if we want an aggregation run the code below
    // // if aggregation is === none just serve the an array of array that have [x,y]
    // // series: [
    // // {
    // //     type: 'scatter',
    // //     data: [
    // //       [10, 5],
    // //       [0, 8],
    // //       [6, 10],
    // //       [2, 12],
    // //       [8, 9],
    // //       [8,7]
    // //     ]
    // // }
    // // ]
    // // };
    // const grouped = this.df.groupBy(columnCategory);

    // console.log(grouped,`<<<DF Grouped on ${columnCategory}`);

    // const aggregations = {
    //   sum: (df, col) => df.stat.sum(col),
    //   mean: (df, col) => df.stat.mean(col),
    //   median: (df, col) => df.stat.median(col),
    //   min: (df, col) => df.stat.min(col),
    //   max: (df, col) => df.stat.max(col),
    // };

    // const aggregatedData = grouped
    //   .aggregate((group) => {
    //     const result = {};
    //     validColumns.forEach((col) => {
    //       result[col] = aggregations[aggregation](group, col);
    //     });
    //     return result;
    //   })
    //   .toArray();

    // const scale = ColorScale.getColorScale(
    //   this.getAttribute("color-scale") || "Viridis",
    //   this.getAttribute("color-primary") || "#000000",
    //   this.getAttribute("color-secundary") || "#ffffff",
    //   aggregatedData.length
    // );

    // const xAxisData = aggregatedData.map((item) => item[0]);

    // series.data = aggregatedData.map((item, index) => ({
    //   value: item[1][validColumns[0]],
    //   name: item[0],
    //   itemStyle: { color: scale(index) },
    // }));

    // console.log(series.data,'<<<SeriesData');

    return {
      series,
    };
  }

  updateOption() {
    let title = this.getAttribute("chart-title") || "Scatter Plot";
    let xAxisLabel = this.getAttribute("chart-x-axis-label") || "";
    let yAxisLabel = this.getAttribute("chart-y-axis-label") || "";
    let subtitle = this.getAttribute("chart-subtitle") || "";
    let showLegend = this.getAttribute('chart-show-legend') === 'show';
    let showDataZoom = this.getAttribute('chart-show-zoom') === 'show';
    // let showLabels = this.getAttribute('chart-show-labels') === 'show';


    const seriesData = [];
    
    // Helper function to get attribute by prefix and index
    const getAttributeByPrefixAndIndex = (prefix, index) => this.getAttribute(`${prefix}-${index}`) || '';

    // Series attributes series-xxxx-1
    let index = 0;
    while (true) {
        const seriesTitle = getAttributeByPrefixAndIndex('series-title', index);
        const columnCategory = getAttributeByPrefixAndIndex('series-column-xaxis', index);
        const columnValues = getAttributeByPrefixAndIndex('series-column-yaxis', index);
        const aggregation = getAttributeByPrefixAndIndex('series-aggregation', index);
        const seriesColorspace = getAttributeByPrefixAndIndex('series-colorspace', index);
        const seriesPrimaryColor = getAttributeByPrefixAndIndex('series-primary-color', index);
        const seriesSecondaryColor = getAttributeByPrefixAndIndex('series-secondary-color', index);
        const seriesSymbolSize = getAttributeByPrefixAndIndex('series-symbol-size', index);
        const seriesShowLabels = getAttributeByPrefixAndIndex('series-show-labels', index) === 'show';




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
            seriesSymbolSize,
            seriesShowLabels
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
      legend: {
        show: showLegend,
        orient: "horizontal",
        top: "30",
        right: '100'
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: 'cross'
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
      xAxis:
         {
              type: "value",
              name: xAxisLabel,
              nameLocation: 'middle',
              nameTextStyle: "Poppins",
              nameGap:  20,
            },
      yAxis:
         {    type: 'value',
              name: yAxisLabel,
              nameTextStyle: "Poppins",
              nameRotate: 90,
              nameLocation: 'middle',
              nameGap:  20,
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

customElements.define("cb-echart-scatterplot", ScatterPlot);
