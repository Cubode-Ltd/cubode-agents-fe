const template = document.createElement('template');
template.innerHTML = `
    <style>@import "css/index.css";</style>
    <div class="cb-cube-main"></div>
`;

class CubeText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log("Cube Connected");
    }

    disconnectedCallback() {
        console.log("Cleanup");
    }

    updateComponent() {
        if (this.config) {
            const svg = this.shadowRoot.querySelector('#cube_svg');
            // Apply configurations, for example:
            svg.style.backgroundColor = this.config.backgroundColor;
            // Additional property settings based on this.config
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'config') {
            this.config = JSON.parse(newValue);
            this.updateComponent();
        }
    }

    set configuration(config) {
        this.config = config;
        this.setAttribute('config', JSON.stringify(config)); // Sync attribute with property
        this.updateComponent();
    }

    get configuration() {
        return this.config;
    }
}

customElements.define('cb-cube-text', Cube);