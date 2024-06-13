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
    <style>
        @import "./css/main.css";
        .cb-echart-barplot {
            width: 100%;
            height: 30vh;
        }

        @media (min-width: 640px) {
            .cb-echart-barplot {
                height: 40vh; /* Different height for small screens and above */
            }
        }

        @media (min-width: 1024px) {
            .cb-echart-barplot {
                height: 40vh; /* Different height for large screens and above */
            }
        }
    </style>

    <div class="cb-echart-barplot relative w-full overflow-hidden">
        <div class="cb-chart-container w-full h-full"></div>

        <div id="openModalButton" class="cursor-pointer absolute top-0 left-0 fill-gray-700 hover:fill-gray-900 drop-shadow-md ml-2 mt-2">
            <svg width="20" class="pointer-events-none	" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="gearIcon" viewBox="0 0 45.973 45.973" xml:space="preserve">
                <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774    c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815    C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607    c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205    C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501    C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763    c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733    s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128    c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735    c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77    c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z     M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85    C30.906,27.334,27.355,30.85,22.976,30.85z"/>
            </svg>
        </div>

        <dialog id="my_modal_1" class="modal">
            <div class="modal-box bg-white rounded-md">
                <h3 class="font-bold text-lg">Plot Features</h3>
                <p class="py-4">
                <div class="modal-action flex flex-col">
                    <div></div>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full my-2" />

                    <input type="text" placeholder="Type here" class="input input-bordered w-full my-2" />

                    <input type="text" placeholder="Type here" class="input input-bordered w-full my-2" />

                    <input type="text" placeholder="Type here" class="input input-bordered w-full my-2" />

                    <select class="select select-bordered w-full my-2 ml-0">
                        <option disabled selected>Choose a color</option>
                        <option>Custom</option>
                        <option>Blue</option>
                        <option>Red</option>
                        <option>Green</option>
                    </select>

                    <select class="select select-bordered w-full my-2 ml-0">
                        <option disabled selected>Choose a color</option>
                        <option>Custom</option>
                        <option>Blue</option>
                        <option>Red</option>
                        <option>Green</option>
                    </select>





                    <button class="btn w-full mt-5" id="closeModalButton">Close</button>
                </div>
            </div>
        </dialog>
    </div>
`;

class BarPlot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.element = this.shadowRoot.querySelector('.cb-chart-container');
        this.chart_ = echarts.init(this.element);
        this.data_ = [5, 20, 36, 10, 10];

        this.modal = this.shadowRoot.querySelector('#my_modal_1');
        this.openModalButton = this.shadowRoot.querySelector('#openModalButton');
        this.closeModalButton = this.shadowRoot.querySelector('#closeModalButton');

        this.openModalButton.addEventListener('click', this.showModal.bind(this));
        this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
    }

    static get observedAttributes() {
        return ['colorscale', 'color1', 'color2'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }


    showModal() {
        this.modal.showModal();
    }

    closeModal() {
        this.modal.close();
    }

    connectedCallback() {
        this.render();
        this.observeResize({
            animation: {
                duration: 500,
                easing: 'cubicInOut',
            },
        });;
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
        window.removeEventListener('resize', this.handleResize);
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