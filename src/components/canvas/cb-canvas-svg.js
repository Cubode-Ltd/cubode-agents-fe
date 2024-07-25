const template = document.createElement('template');
template.innerHTML = `
    <style>@import "css/index.css";</style>

    <svg class="cb-canvas-svg fill-white dark:fill-gray-800 overflow-visible" x="0" y="0" width="100%" height="100%" style="z-index:1;">   
    </svg>
`;

class CanvasSVG extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log("Cubode svg");
    }

    disconnectedCallback() {
        console.log("Cleanup");
    }
}

customElements.define('cb-canvas-svg', CanvasSVG);
