import * as echarts from 'echarts/core';

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
        return ['colorscale', 'color1', 'color2'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
          if (name === 'data') {
            this.data_ = JSON.parse(newValue);
          }
          this.render();
        }
    }

    handleFormSubmit(value) {
      console.log("values", value)
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
      const { csvContent, columns } = event.detail;
      this.columns_ = columns;
      this.data_ = csvContent;
      this.render();
    } 

    set data(data) {
      this.data_ = data;
      this.setAttribute('data', JSON.stringify(data));
    }

    render() {
        const colorScaleAttr = this.getAttribute('colorScale') || 'Viridis';
        const color1 = this.getAttribute('color1') || '#000000';
        const color2 = this.getAttribute('color2') || '#ffffff';
        const scale = ColorScale.getColorScale(colorScaleAttr, color1, color2, this.dataTemp_.length);


        const xAxisData = this.columnsTemp_;
        const seriesData = this.dataTemp_.map((value, index) => ({
          value: value,
          itemStyle: { 
              color: scale(index) 
          }
        }));

        const option = {
            title: {
                text: 'Bar Plot',
                left: 'center'
            },
            tooltip: {},
            xAxis: {
                data: xAxisData
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: seriesData
            }],
            animationDuration: 1000
        };

        this.chart_.setOption(option);
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
