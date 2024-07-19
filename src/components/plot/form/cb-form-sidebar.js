import React from 'react';
import { createRoot } from 'react-dom/client';
import FormComponent from './cb-form';

const sidebarTemplate = document.createElement('template');
sidebarTemplate.innerHTML = `
  <style>@import "dev/css/main.css";</style>
  
  <div class="sidebar-container relative">
    <div class="cb-sidebar-button cursor-pointer absolute top-0 left-1 drop-shadow-md hover:drop-shadow-lg ml-2 mt-2 fill-gray-400 hover:fill-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
        </svg>
    </div>

    <div class="sidebar closed fixed left-0 xl:-left-[22rem] top-5 z-5 bg-gray-50 dark:bg-gray-600 w-[22rem] h-[94%] flex flex-col">
        <div class="flex-grow h-full overflow-auto custom-scrollbar border">
            <div class="react-component h-full mt-6"></div>
        </div>
        <button class="cb-close-sidebar-button absolute top-3 right-4 h-5 w-5 p-1 hover:border rounded-sm  hover:bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 hover:text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9.293l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.95-4.95-4.95A1 1 0 115.05 4.343L10 9.293z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>
  </div>
`;

class SidebarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(sidebarTemplate.content.cloneNode(true));

    this.sidebar = this.shadowRoot.querySelector('.sidebar');
    this.closeButton = this.shadowRoot.querySelector('.cb-close-sidebar-button');
    this.openButton = this.shadowRoot.querySelector('.cb-sidebar-button');
    this.reactForm = this.shadowRoot.querySelector('.react-component');

    this.closeButton.addEventListener('click', this.closeSidebar.bind(this));
    this.openButton.addEventListener('click', this.toggleSidebar.bind(this));

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
    
  static get observedAttributes() {
        return ['allow-multiple-series'];  
  }

  // #get the attributes

  connectedCallback() {
    this.renderReactComponent();
  }

  set callBack(cb) {
    this._callBack = cb;
  }

  get callBack() {
    return this._callBack;
  }

  set schema(value) {
    this._schema = value;
    this.renderReactComponent();
  }

  get schema() {
    return this._schema;
  }

  set initialValues(value) {
    this._initialValues = value;
  }

  get initialValues() {
    return this._initialValues;
  }

  toggleSidebar() {
    if (this.sidebar.classList.contains('closed')) {
      this.openSidebar();
    } else {
      this.closeSidebar();
    }
  }

  openSidebar() {
    this.sidebar.classList.remove('closed');
    this.sidebar.classList.add('open');
  }

  closeSidebar() {
    this.sidebar.classList.remove('open');
    this.sidebar.classList.add('closed');
  }

  handleFormSubmit(value) {
    if (this.callBack) {
      this._callBack(value);
    }
  }

  renderReactComponent() {
    if (this.reactForm && this.initialValues) {
      const root = createRoot(this.reactForm);
      root.render(
        <FormComponent
          allowAddForms={true}
          formSchema={this.schema}
          initialValues={this.initialValues}
          onFormSubmit={this.handleFormSubmit}
          onFormChange={this.handleFormSubmit}
          hasMultipleSeries={this.hasAttribute('has-multiple-series')}
        />
      );
    }
  }
}

customElements.define('cb-plot-sidebar', SidebarComponent);
