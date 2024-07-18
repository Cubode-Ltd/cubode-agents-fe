const template = document.createElement('template');
template.innerHTML = `
    <style>@import "./css/main.css";</style>
    <div class="cb-sidepanel absolute bg-white dark:bg-gray-700 left-0 top-1/2 transform -translate-y-1/2 w-16 h-20 m-1 pd-1 rounded-lg shadow-xl border">
    </div>
`;

class SidePanel extends HTMLElement {
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

customElements.define('cb-sidepanel', SidePanel);