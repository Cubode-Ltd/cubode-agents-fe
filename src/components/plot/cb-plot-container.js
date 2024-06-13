const template = document.createElement('template');
template.innerHTML = `
    <style>@import "./css/main.css";</style>
    <div class="cb-plot relative container mx-auto w-full overflow-hidden">
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