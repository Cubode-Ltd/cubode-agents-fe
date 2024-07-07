import React from 'react';
import { createRoot } from 'react-dom/client';

import MyForm from './cb-new-form.js'


const template = document.createElement('template');
template.innerHTML = `
    <style>@import "dev/css/main.css";</style>
    <div class="relative container mx-auto w-full overflow-hidden">
        <div class="react-component"></div>
    </div>
`;

class FormContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.reactForm = this.shadowRoot.querySelector('.react-component');
        this.re
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    render() {
        this.renderReactComponent()
    }

    renderReactComponent() {
        if (this.reactForm) {
            const root = createRoot(this.reactForm);
            root.render(<MyForm schema={this.schema} schemaUI={this.schemaUI} onFormSubmit={this.handleFormSubmit} />);              
        }
    }
}

customElements.define('cb-test-form', FormContainer);
