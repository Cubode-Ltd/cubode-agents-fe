import * as echarts from 'echarts/core';
const { DataFrame } = require('dataframe-js');

// import dataNursery from './DataNursery';

import ColorScale from './ColorScales';
import { formSchema } from './schemas/barplot';

import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer]);

const template = document.createElement('template');
template.innerHTML = `
    <style>@import "./css/main.css";</style>

    <div class="cb-echart-barplot relative w-full overflow-hidden" style="height:40vh;">
        <div class="cb-chart-container w-full h-full"></div>
        <cb-plot-modal class="absolute top-0"></cb-plot-modal>
    </div>
`;

class BarPlot extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.element = this.shadowRoot.querySelector('.cb-chart-container');
      this.modal = this.shadowRoot.querySelector('cb-plot-modal');

      this.chart_ = echarts.init(this.element);
      this.data_ = [];
      this.columns_ = [];
      
      this.dataTemp_ = [5, 20, 36, 10, 10];
      this.columnsTemp_ = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'];

      this.handleDataSelected = this.handleDataSelected.bind(this);
      this.formSchema = formSchema;
    }

    static get observedAttributes() {
        // Create attributes from the Schema
        const attrs = ['hash', 'fileName'];
        const schemaProperties = formSchema.properties;
        Object.keys(schemaProperties).forEach(key => {
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
        console.log("values", value);
        Object.keys(value).forEach(key => {
            this.setAttribute(key, value[key]);
        });
    }

    connectedCallback() {
        this.render();
        this.observeResize({
            animation: {
                duration: 500,
                easing: 'cubicInOut',
            },
        });;

        if (this.modal) {
            this.modal.callBack = this.handleFormSubmit;
            this.modal.schemaUI = this.formSchemaUI;
            this.modal.schema = this.formSchema;
        }

        // Event coming from data source selector
        window.addEventListener('data-selected', this.handleDataSelected);

    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('data-selected', this.handleDataSelected);
    }

    handleDataSelected(event) {
      const { csvContent, csvDataRows, columns, hash, fileName } = event.detail;
      this.columns_ = columns;
      this.data_ = csvDataRows;
      this.hash = hash;
      this.fileName = fileName

      this.setAttribute('hash', hash);
      this.setAttribute('fileName', fileName);
      this.render();
    } 

    plotData() {
        let columnCategory = this.getAttribute('column-category') || '';
        let columnsValues = this.getAttribute('column-values') || '';
        let aggregation = this.getAttribute('aggregation') || '';
        let series = {
            'type': 'bar', 
            'name': '',
            'data': [],
            'style': {
                'color': 'black'
            }
        }

        // TODO: ADD LOGIC TO GET THE DATA IF THERE IS A HASH / FILENAME.
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
            'max': (df, col) => df.stat.max(col)
        };
    
        const aggregatedData = grouped.aggregate(group => {
            const result = {};
            validColumns.forEach(col => {
                result[col] = aggregations[aggregation](group, col);
            });
            return result;
        }).toArray();
    
        const scale = ColorScale.getColorScale(
            this.getAttribute('color-scale') || 'Viridis',
            this.getAttribute('color-primary') || '#000000',
            this.getAttribute('color-secundary') || '#ffffff',
            aggregatedData.length
        );
    
        const xAxisData = aggregatedData.map(item => item[0]); // Group keys for x-axis
    
        series.data = aggregatedData.map((item, index) => ({
            value: item[1][validColumns[0]], // Using the first valid column for the value
            name: item[0], // The group key (e.g., "Female" or "Male")
            itemStyle: { color: scale(index) }
        }));
    
        return {
            series,
            xAxisData
        };
    }

    updateOption() {
        let title = this.getAttribute('title') || 'Bar Plot';
        let xAxisLabel = this.getAttribute('x-axis-label') || '';
        let yAxisLabel = this.getAttribute('y-axis-label') || '';

        let subtitle = this.getAttribute('subtitle') || '';
        let legendPosition = this.getAttribute('legend-position') || '';
        let colorScale = this.getAttribute('color-scale') || 'Viridis';
        let colorPrimary = this.getAttribute('color-primary') || '#000000';
        let colorSecundary = this.getAttribute('color-secundary') || '#ffffff';
 
        const plotData = this.plotData();
        const seriesData = plotData.series;
        const xAxisData = plotData.xAxisData;

        this.option = {
            title: {
                text: title,
                left: 'center'
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                name: xAxisLabel
            },
            yAxis: {
                name: yAxisLabel
            },
            series: [seriesData],
            animationDuration: 1000
        };

        this.chart_.setOption(this.option);
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
