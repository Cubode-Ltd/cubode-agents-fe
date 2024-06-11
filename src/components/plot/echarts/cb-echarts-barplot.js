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
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.element = this.shadowRoot.querySelector('.cb-chart-container')
    }
    
    connectedCallback() {
        var myChart = echarts.init(this.element);
        var data = [5, 20, 36, 10, 10];

        // List of available D3 color interpolators
        var colorScales = {
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
            YlOrRd: d3.interpolateYlOrRd
        };

        // Choose a color scale from the list
        var chosenScale = 'Inferno'; // Change this to use a different color scale

        // Create a color scale using D3
        var colorScale = d3.scaleSequential(colorScales[chosenScale])
            .domain([0, data.length - 1]);

        // Apply the color scale to the data
        var coloredData = data.map((value, index) => ({
            value: value,
            itemStyle: { 
                color: colorScale(index) 
            }
        }));

        // Initialize ECharts
        var chartDom = document.getElementById('main');
        var option;

        option = {
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

            renderer: {
                resize: true
            }
        };
        option && myChart.setOption(option);

        // Observe size changes of the container
        const resizeObserver = new ResizeObserver(() => {
            myChart.resize();
        });
        resizeObserver.observe(this.element);

        // Resize on window resize
        window.addEventListener('resize', () => {
            myChart.resize();
        });

        // Store the observer so it can be disconnected later
        this.resizeObserver = resizeObserver;
        this.myChart = myChart;
    }

    disconnectedCallback() {
    }

}

customElements.define('cb-echart-barplot', BarPlot);
