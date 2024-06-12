const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "./css/main.css";
    </style>
    <div class="cb-plot relative container mx-auto px-4 sm:w-full lg:w-1/2" style="width:100%; height:400px; overflow: hidden;">
        <slot></slot>
    </div>
`;

class PlotContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }
}

customElements.define('cb-plot-container', PlotContainer);