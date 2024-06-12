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
    <div class="cb-echart-barplot" style="width:100%; height:400px; overflow: hidden;">
        <div class="cb-chart-container" style="width:100%; height:100%"></div>
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
    }

    static get observedAttributes() {
        return ['colorscale', 'color1', 'color2'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
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