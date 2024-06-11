const template = document.createElement('template');
template.innerHTML = `
    <div class="cb-canvas-main absolute overflow-hidden w-full h-full" style="z-index:1;">
        <slot name="cb-canvas-ph"></slot>
    </div>
`;

class Canvas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log("Cubode Canvas");
    }

    disconnectedCallback() {
        console.log("Cleanup");
    }

    set test(a) {
        console.log("Blastoiser + ", a)
    }
}

customElements.define('cb-canvas-main', Canvas);
