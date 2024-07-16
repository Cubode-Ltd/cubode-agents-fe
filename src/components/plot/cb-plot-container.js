const template = document.createElement('template');
template.innerHTML = `
    <style>@import "dev/css/main.css";</style>
    <div class="cb-plot relative container mx-auto w-full overflow-hidden">
        <slot></slot>
    </div>
`;

// Element to add the carousel to.
class PlotContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('cb-plot-container', PlotContainer);