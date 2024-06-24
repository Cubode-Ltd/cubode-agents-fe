const template = document.createElement('template');
template.innerHTML = `
    <style>@import "./css/main.css";</style>
    <div class="cb-maincontainer container bg-white dark:bg-gray-700 mx-auto px-4 sm:w-full lg:w-1/2">
        <div class="bg-white py-3 rounded-lg shadow-lg">
            <slot></slot>    
        </div>
    </div>
`;

class Container extends HTMLElement {
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

customElements.define('cb-container', Container);