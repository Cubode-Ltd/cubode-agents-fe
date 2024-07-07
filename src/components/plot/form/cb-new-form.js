import "../../../css/main.css";

import React from 'react';
import { createRoot } from 'react-dom/client';
import FormikComponent from './plots/cb-form-barplot';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import "css/main.css";
    @import "https://cdn.jsdelivr.net/npm/@yaireo/tagify/dist/tagify.css";
  </style>
  <div class="relative container mx-auto w-full overflow-hidden p-10 rounded-lg border-4 bg-slate-500 border-green-600 bg-green-400">
    <div class="react-component w-full"></div>
  </div>
`;

class FormTest extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.reactForm = this.shadowRoot.querySelector('.react-component');
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  render() {
    const root = createRoot(this.reactForm);
    root.render(<FormikComponent />);
  }
}

customElements.define('formik-web-component', FormTest);