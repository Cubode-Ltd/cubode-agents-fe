const template = document.createElement('template');
template.innerHTML = `
    <div class="cb-canvas overflow-hidden" style="height: 100vh; position: relative; overflow: hidden !important;">
        <slot name="cb-canvas-child"></slot>
    </div>
`;

class CubodeMain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        document.body.style.margin = 0;
    }

    disconnectedCallback() {
        console.log("Cleanup");
    }
}

customElements.define('cb-canvas', CubodeMain);
