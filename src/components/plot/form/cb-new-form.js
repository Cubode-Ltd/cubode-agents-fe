import React from 'react';
import { createRoot } from 'react-dom/client';
import BarPlotForm from './plot-forms/cb-form-barplot';

const template = document.createElement('template');
template.innerHTML = `
  <style>@import "dev/css/main.css";</style>
  
  <div class="container mx-auto px-4 sm:w-full lg:w-1/2 bg-white border pb-2 pt-3 rounded-2xl shadow-lg flex-col gap-1 my-3">
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
    root.render(<BarPlotForm />);
  }
}

customElements.define('formik-web-component', FormTest);