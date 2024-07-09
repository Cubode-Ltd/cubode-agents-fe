import React from 'react';
import { createRoot } from 'react-dom/client';
import FormComponent from './form/plot-forms/cb-form-component';

const sidebarTemplate = document.createElement('template');
sidebarTemplate.innerHTML = 
  `<style>
    @import "dev/css/main.css";
    .sidebar {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .sidebar.open {
      transform: translateX(0);
      opacity: 1;
    }
    .sidebar.closed {
      transform: translateX(-100%);
      opacity: 0;
    }
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #F3F4F6; /* Tailwind color gray-500 */
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background-color: #F9FAFB; /* Tailwind color gray-200 */
        margin-top: 10px;
    }

  </style>
  <div class="sidebar-container" style="position: relative;">
    <div class="cb-sidebar-button cursor-pointer absolute top-0 left-1 drop-shadow-md hover:drop-shadow-lg ml-2 mt-2 fill-gray-400 hover:fill-gray-500">
        <svg width="15" height="15" class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="gearIcon" viewBox="0 0 45.973 45.973" xml:space="preserve">
            <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815 C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607 c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128 c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85 C30.906,27.334,27.355,30.85,22.976,30.85z"/>
        </svg>
    </div>

    <div class="sidebar closed fixed left-0 top-0 bg-white dark:bg-gray-600 border-r-2 border-gray-300 w-96 h-full pl-5 py-5 pr-2 flex flex-col">
        <button class="cb-close-sidebar-button absolute top-2 right-2 h-5 w-5 p-1 border-2 border-white rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 hover:text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9.293l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.95-4.95-4.95A1 1 0 115.05 4.343L10 9.293z" clip-rule="evenodd" />
            </svg>
        </button>
        <div class="flex-grow h-full pr-3 overflow-auto custom-scrollbar">
            <div class="react-component h-full"></div>
        </div>
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
    if (this.reactForm) {
      const root = createRoot(this.reactForm);
      root.render(
        <FormComponent
          allowAddForms={true}
          formSchema={this.schema}
          initialValues={this.initialValues}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    }
  }
}

customElements.define('cb-plot-sidebar', SidebarComponent);
