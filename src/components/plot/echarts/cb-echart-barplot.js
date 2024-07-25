import * as echarts from 'echarts/core';
const { DataFrame } = require('dataframe-js');

import ColorScale from './utils/ColorScales';
import { formSchema, initialValues } from './schemas/barplot'
import { BarChart } from 'echarts/charts';

import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer]);

const template = document.createElement('template');
template.innerHTML = `
    <style>@import "dev/css/main.css";</style>

    <div class="cb-echart-barplot cb-wc-height relative w-full overflow-hidden pt-2">
        <div class="cb-chart-container w-full h-full"></div>
        <cb-plot-sidebar class="absolute top-0 z-50"></cb-plot-sidebar>
    </div>
`;

class BarPlot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
        const attrs = ['hash', 'fileName'];
        const schemaProperties = formSchema.properties;
        Object.keys(schemaProperties).forEach(key => {
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
        this.listeners();
        this.render();
        this.observeResize({
            animation: {
                duration: 500,
                easing: 'cubicInOut',
            },
        });;

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

        window.addEventListener('data-selected', this.handleDataSetSelected);

    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('data-selected', this.handleDataSetSelected);
    }

    handleDataSetSelected(event) {
        const { csvContent, csvDataRows, columns, hash, fileName } = event.detail;
        this.columns_ = columns;
        this.data_ = csvDataRows;
        this.hash = hash;
        this.fileName = fileName

        this.setAttribute('hash', hash);
        this.setAttribute('fileName', fileName);

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

    plotData(seriesName, columnCategory, columnsValues, aggregation, colorScale, primaryColor, secondaryColor, showBackground, showLabels) {
        aggregation = aggregation === '' ? 'none' : aggregation.toLowerCase();
        showLabels = showLabels === 'show' ? true : false;
        let series = {
            'type': 'bar', 
            'name': seriesName,
            'data': [],
            'style': {
                'color': 'black'
            },
            'showBackground': showBackground,
            label: {
                show: showLabels,
                position: 'outside',
                fontFamily: 'Poppins',
                fontWeight: 'normal'
              }
        }
    
        if (!this.data_ || columnCategory === '' || columnsValues === '') {
            return series;
        }
    
        const validColumns = columnsValues.split(',').filter(col => this.columns_.includes(col));
        if (validColumns.length === 0) {
            return series;
        }
    
        this.df = new DataFrame(this.data_);
        const grouped = this.df.groupBy(columnCategory);
    
        const aggregations = {
            'sum': (df, col) => df.stat.sum(col),
            'mean': (df, col) => df.stat.mean(col),
            'median': (df, col) => df.stat.median(col),
            'min': (df, col) => df.stat.min(col),
            'max': (df, col) => df.stat.max(col),
            'none': (df, col) => df.select(col).toArray().map(row => row[0]) // Direct values without aggregation
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
    
        const xAxisData = aggregatedData.map(item => item[0]);
    
        series.data = aggregatedData.map((item, index) => {
            let value = item[1][validColumns[0]];
            if (value % 1 !== 0) {
                value = value.toFixed(2); // Round the value to two decimal places only if it has decimals
            }
            return {
            value: value,
            name: item[0],
            itemStyle: { color: scale(index) }
            };
        });
    
        return {
            series,
            xAxisData
        };
    }
    
    updateOption() {
        // Chart Attributes chart-xxxx
        let title = this.getAttribute('chart-title') || 'Bar Plot';
        let subtitle = this.getAttribute('chart-subtitle') || '';
        let xAxisLabel = this.getAttribute('chart-xaxis-label') || '';
        let yAxisLabel = this.getAttribute('chart-yaxis-label') || '';
        let showBackground = this.getAttribute('chart-show-background') === 'show';
        let showLegend = this.getAttribute('chart-show-legend') === 'show';

        
        const seriesData = [];
        // const xAxisData = new Set();
        const xAxisData = [];

    
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
            const seriesShowLabels = getAttributeByPrefixAndIndex('series-show-labels', index);

            // if (!seriesTitle && !columnCategory && !columnValues && !aggregation) {
            //     break;
            // }

            if (!columnCategory || !columnValues || !aggregation) {
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
                showBackground,
                seriesShowLabels
            );

            seriesData.push(plotData.series);
            if (index === 0){
                xAxisData.push(...plotData.xAxisData);
      
              }
            // plotData.xAxisData.forEach(data => xAxisData.add(data));
            index++;
        }
    
        this.option = {
            title: {
                text: title,
                subtext: subtitle,
                left: "center",
                textStyle: {
                  fontFamily: "Poppins",
                  fontWeight: 500,
                },
                subtextStyle: {
                  fontFamily: "Poppins"
                }
              },
            label: {
                fontFamily:"Poppins",
              },
            toolbox: {},
            tooltip: {
                trigger: "item",
                axisPointer: {
                  type: 'cross'
                }
              },
            legend: {
                show: showLegend,
                right: "20%",
                top: "6%",
                itemStyle: {
                  color: "#1E395C"
                }
              },
            xAxis: {
                type: 'category',
                data: xAxisData, 
                // Array.from(xAxisData),
                name: xAxisLabel,
                axisLabel: {interval: 0, rotate: 30},
                axisTick: { alignWithLabel: true},
     
            },
            yAxis: {
                name: yAxisLabel,
                nameTextStyle: "Poppins",
                nameRotate: 90,
                nameLocation: 'middle',
                nameGap:  20,
            },
            series: seriesData,
            animationDuration: 1000
        };
        
        this.chart_.setOption(this.option);
    }
    
    listeners() {
        const container = document.querySelector('cb-container');
        if (container) {
            container.addEventListener('export', () => {
                console.log('Export button clicked');
              });
        }
    }

    render() {
        this.updateOption();
        this.chart_.resize({
            animation: {
                duration: 500,
                easing: 'cubicInOut',
            },
        });
    }

    observeResize() {
        const resizeObserver = new ResizeObserver(() => {
            if (this.chart_) {
                this.chart_.resize({
                    animation: {
                    duration: 500,
                    easing: 'quadraticOut',
                    },
                });
            }
        });

        resizeObserver.observe(this.element);
        this.resizeObserver = resizeObserver;

        window.addEventListener('resize', this.handleResize.bind(this));
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
                easing: 'cubicInOut',
                },
            });;
        }
    }
}

customElements.define('cb-echart-barplot', BarPlot);