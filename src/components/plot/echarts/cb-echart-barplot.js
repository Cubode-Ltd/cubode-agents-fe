import * as echarts from 'echarts/core';
const { DataFrame } = require('dataframe-js');

import ColorScale from './utils/ColorScales';
import { formSchema, initialValues } from './schemas/barplot'
import { BarChart } from 'echarts/charts';
import dataNursery from '../../../utils/DataNursery';

import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer]);

const template = document.createElement('template');
template.innerHTML = `
    <div class="cb-echart-barplot cb-wc-height relative w-full overflow-hidden pt-2">
        <div class="cb-chart-container w-full h-full"></div>
        <cb-plot-sidebar class="absolute top-0 z-50"></cb-plot-sidebar>
    </div>
`;

class BarPlot extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));

        this.main = this.querySelector('.cb-echart-barplot');
        this.element = this.querySelector('.cb-chart-container');
        this.modal = this.querySelector('cb-plot-modal');
        this.sidebar = this.querySelector('cb-plot-sidebar');

        this.chart_ = echarts.init(this.element);

        this.data_ = [];
        this.columns_ = [];

        this.handleDataSetSelected = this.handleDataSetSelected.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.formSchema = formSchema;
        this.initialValues = this.updateInitialValues(initialValues);
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

    updateInitialValues(initialValues) {
        initialValues['chart-title'] = this.getAttribute("chart-title") || '';
        initialValues['chart-subtitle'] = this.getAttribute("chart-subtitle") || '';
        initialValues['chart-x-axis-label']= this.getAttribute("chart-x-axis-label");
        initialValues['chart-y-axis-label']= this.getAttribute("chart-y-axis-label");

        initialValues.dynamicForms[0]['series-column-category'] = this.getAttribute('series-column-category-0');
        initialValues.dynamicForms[0]['series-column-values'] = this.getAttribute('series-column-values-0');
        initialValues.dynamicForms[0]['series-aggregation'] = this.getAttribute('series-aggregation-0') || '';
        initialValues.dynamicForms[0]['series-colorspace'] = this.getAttribute('series-colorspace-0');
      
        return initialValues;
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
        // Handles already selected data
        const hash = this.getAttribute('hash');
        const fileName = this.getAttribute('fileName');
        console.log("HASH:  ", hash)
        console.log("fileName:  ", fileName)

        if (hash && fileName) {
            this.handlePreLoadedData(hash, fileName)
        }
    }

    async handlePreLoadedData(hash, fileName){
        try {
            const csvContent = await dataNursery.hashes2data.getItem(hash);
            const csvDataRows = await dataNursery.hashes2dataRows.getItem(hash);
            const columns = await dataNursery.hash2columns.getItem(hash);
    
            // Simulate a data-selected event with the fetched data
            this.handleDataSetSelected({
                detail: {
                    csvContent,
                    csvDataRows,
                    columns,
                    hash,
                    fileName
                }
            });
            console.log("doing the data selected")
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
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

    plotData(seriesName, columnCategory, columnsValues, aggregation, colorScale, primaryColor, secondaryColor, showBackground) {
        aggregation = aggregation === '' ? 'none' : aggregation.toLowerCase();
    
        let series = {
            'type': 'bar', 
            'name': seriesName,
            'data': [],
            'style': {
                'color': 'black'
            },
            'showBackground': showBackground
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
        
        console.log("DATA FROM THE PLOT:    ", aggregatedData)

    
        const scale = ColorScale.getColorScale(
            colorScale || 'Viridis',
            primaryColor || '#000000',
            secondaryColor || '#ffffff',
            aggregatedData.length
        );
    
        const xAxisData = aggregatedData.map(item => item[0]);
    
        series.data = aggregatedData.map((item, index) => ({
            value: item[1][validColumns[0]],
            name: item[0],
            itemStyle: { color: scale(index) }
        }));
    
        return {
            series,
            xAxisData
        };
    }
    
    updateOption() {
        // Chart Attributes chart-xxxx
        let title = this.getAttribute('chart-title') || 'Bar Plot';
        let subtitle = this.getAttribute('chart-subtitle') || '';
        let xAxisLabel = this.getAttribute('chart-x-axis-label') || '';
        let yAxisLabel = this.getAttribute('chart-y-axis-label') || '';
        let showBackground = this.getAttribute('chart-show-background') === 'show';
        
        const seriesData = [];
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
                showBackground
            );

            seriesData.push(plotData.series);
            if (index === 0 && plotData.xAxisData){
                xAxisData.push(...plotData.xAxisData);
            }
            index++;
        }

    
        this.option = {
            title: {
                text: title,
                subtext: subtitle,
                left: 'center',
            },
            toolbox: {
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                },
              },
            tooltip: {
                trigger: "item",
                axisPointer: {
                  type: 'cross'
                }
              },
              xAxis: {
                type: "category",
                data: xAxisData,
                name: xAxisLabel,
                axisLabel: {interval: 0, rotate: 30},
                axisTick: { alignWithLabel: true}
              },
            yAxis: {
                name: yAxisLabel
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