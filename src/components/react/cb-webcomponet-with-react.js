// MyWebComponent.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import MyReactComponent from './cb-react-for-webcomponent';

class MyWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = '';

    // Create the root for React
    this.root = createRoot(this.shadowRoot);
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data' && oldValue !== newValue) {
      this._data = newValue;
      this.render();
    }
  }

  set data(value) {
    this._data = value;
    this.setAttribute('data', value);
  }

  get data() {
    return this._data;
  }

  handleDataChange = (newData) => {
    this.data = newData;
    console.log("Data from React Component: ", this.data);
    this.dispatchEvent(new CustomEvent('data-change', { detail: newData }));
  };

  render() {
    this.root.render(
      <MyReactComponent data={this._data} onDataChange={this.handleDataChange} />
    );
  }
}

customElements.define('webcomponent-with-react', MyWebComponent);
