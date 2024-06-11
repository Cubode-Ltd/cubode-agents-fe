import { PanZoom } from "../../utils/PanZoom";

const template = document.createElement('template');
template.innerHTML = `
    <div class="cb-layer relative overflow-hidden w-full h-full">
        <cb-canvas-background></cb-canvas-background>
        <cb-canvas-svg></cb-canvas-svg>
        <cb-canvas-main>
            <div slot="cb-canvas-ph">
                <slot name="cb-cube"></slot> 
            </div>
        </cb-canvas-main>
    </div>
`;

class CanvasLayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
        const canvas = document.querySelector('cb-canvas');
        const layer = this.shadowRoot.querySelector('.cb-layer');
        this.panZoom = new PanZoom(canvas, layer, (scale, x, y) => {
            this.panZoomUpdated(scale, x, y);
        });
    }

    static get observedAttributes() {
        return ['x', 'y', 'zoom'];  
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'x') {
            this.panZoom.originX = parseFloat(newVal) || 0;
            this.panZoom.transform()
        } else if (attrName === 'y') {
            this.panZoom.originY = parseFloat(newVal) || 0;
            this.panZoom.transform()
        } else if (attrName === 'zoom') {
            this.panZoom.scale = parseFloat(newVal) || 1;
            this.panZoom.transform()
        }
    }

    connectedCallback() {
        if (!this.hasAttribute('slot')) {
            this.setAttribute('slot', 'cb-canvas-child');
        }

        this.setAttribute('x', '0');
        this.setAttribute('y', '0');
        this.setAttribute('zoom', '1');
        this.panZoom.initialize();
    }

    disconnectedCallback() {
    }

    panZoomUpdated(scale, x, y) {
        this.setAttribute('zoom', scale.toFixed(2));
        this.setAttribute('x', x.toFixed(2));
        this.setAttribute('y', y.toFixed(2));
    }

    get transform() {
        return {
            x: parseFloat(this.getAttribute('x')) || 0,
            y: parseFloat(this.getAttribute('y')) || 0,
            zoom: parseFloat(this.getAttribute('zoom')) || 1
        };
    }
}

customElements.define('cb-layer', CanvasLayer);
