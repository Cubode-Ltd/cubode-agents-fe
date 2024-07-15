import React from 'react';
import { createRoot } from 'react-dom/client';
import FormComponent from './plot-forms/cb-form-component';
import { formSchema, initialValues } from '../echarts/schemas/barplot_new'

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

  handleFormSubmit(value) {
    console.log("Form submitted: ", value);
    // Handle the form submission
  }

  renderReactComponent() {
    if (this.reactForm) {
      const root = createRoot(this.reactForm);
      root.render(
        <FormComponent
          allowAddForms={true}
          formSchema={formSchema}
          initialValues={initialValues}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    }
  }

  render() {
    this.renderReactComponent();
  }
}

customElements.define('formik-web-component', FormTest);