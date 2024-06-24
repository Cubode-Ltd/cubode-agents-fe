import * as d3 from 'd3';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
    TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

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
        this.data_ = [5, 20, 36, 10, 10];
        
        this.formSchema = {
          "title": "Bar Plot Customization",
          "type": "object",
          "options": {
            "inputAttributes": {
              "class": "w-full mt-1 rounded-lg p-2 h-12"
            },
          },
          "properties": {
            "firstName": {
              "type": "string",
              "title": "First name",
              "options": {
                "inputAttributes": {
                  "class": "w-full bg-transparent outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                  "class": "text-sm text-gray-600 font-bold	"
                }
              }
            },
            "lastName": {
              "type": "string",
              "title": "Last name",
              "options": { 
                "inputAttributes": {
                  "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                  "class": "text-sm text-gray-600 font-bold	"
                }
              }
            },
            "age": {
              "type": "integer",
              "title": "Age",
              "options": {
                "inputAttributes": {
                  "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                  "class": "text-sm text-gray-600 font-bold	"
                }
              }
            },
            "bio": {
              "type": "string",
              "title": "Bio",
              "options": {
                "inputAttributes": {
                  "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                  "class": "text-sm text-gray-600 font-bold	"
                }
              }
            },
            "colorscale": {
              "type": "string",
              "title": "Color Scale",
              "enum": ["Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Pink", "Brown", "Gray", "Black"],
              "default": "Red",
              "options": {
                "inputAttributes": {
                  "class": "w-full mt-1 border border-gray-300 rounded-md p-2 h-12"
                },
              }
            },
            "password": {
              "type": "password",
              "title": "Password",
              "minLength": 3,
              "options": {
                "inputAttributes": {
                  "class": "w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300"
                },
                "containerAttributes": {
                  "class": "text-sm text-gray-600 font-bold	"
                }
              }
            }
          },
          "required": ["firstName", "lastName"]
        };
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
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
        window.removeEventListener('resize', this.handleResize);
    }

    set data(data) {
      this.data_ = data;
      this.setAttribute('data', JSON.stringify(data));
    }

    render() {
        const colorScaleAttr = this.getAttribute('colorScale') || 'Viridis';
        const color1 = this.getAttribute('color1') || '#000000';
        const color2 = this.getAttribute('color2') || '#ffffff';

        const colorScales = {
            YlGnBu: d3.interpolateYlGnBu,
            Viridis: d3.interpolateViridis,
            Inferno: d3.interpolateInferno,
            Magma: d3.interpolateMagma,
            Plasma: d3.interpolatePlasma,
            Warm: d3.interpolateWarm,
            Cool: d3.interpolateCool,
            CubehelixDefault: d3.interpolateCubehelixDefault,
            BuGn: d3.interpolateBuGn,
            BuPu: d3.interpolateBuPu,
            GnBu: d3.interpolateGnBu,
            OrRd: d3.interpolateOrRd,
            PuBuGn: d3.interpolatePuBuGn,
            PuBu: d3.interpolatePuBu,
            PuRd: d3.interpolatePuRd,
            RdPu: d3.interpolateRdPu,
            YlGn: d3.interpolateYlGn,
            YlOrBr: d3.interpolateYlOrBr,
            YlOrRd: d3.interpolateYlOrRd,
            Turbo: d3.interpolateTurbo,
            Cividis: d3.interpolateCividis,
            Rainbow: d3.interpolateRainbow,
            Sinebow: d3.interpolateSinebow,
            Blues: d3.interpolateBlues,
            Greens: d3.interpolateGreens,
            Greys: d3.interpolateGreys,
            Purples: d3.interpolatePurples,
            Reds: d3.interpolateReds,
            Spectral: d3.interpolateSpectral,
            RdYlGn: d3.interpolateRdYlGn,
            RdYlBu: d3.interpolateRdYlBu,
            RdGy: d3.interpolateRdGy,
            RdBu: d3.interpolateRdBu,
            PiYG: d3.interpolatePiYG,
            PRGn: d3.interpolatePRGn,
            PuOr: d3.interpolatePuOr,
            BrBG: d3.interpolateBrBG
        };

        let scale;
        if (colorScaleAttr === 'custom') {
            scale = d3.scaleSequential(d3.interpolateRgb(color1, color2)).domain([0, this.data_.length - 1]);
        } else {
            scale = d3.scaleSequential(colorScales[colorScaleAttr] || d3.interpolateViridis).domain([0, this.data_.length - 1]);
        }

        const coloredData = this.data_.map((value, index) => ({
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
                data: ['Category1', 'Category2', 'Category3', 'Category4', 'Category5']
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: coloredData
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