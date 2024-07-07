import { JSONEditor } from '@json-editor/json-editor';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';


class CustomReactSelectEditor extends JSONEditor.AbstractEditor {
  setValue(value, initial) {
    this.value = value;
    this.refreshValue();
    this.onChange(true);
  }

  refreshValue() {
    const value = this.value;
    const options = this.schema.enum || [];
    this.reactContainer && ReactDOM.render(
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={colourOptions[0]}
        isClearable={true}
        isSearchable={true}
        options={options.map(option => ({ value: option, label: option }))}
        value={{ value, label: value }}
        onChange={(selectedOption) => this.setValue(selectedOption.value)}
      />,
      this.reactContainer
    );
  }

  build() {
    this.label = this.header = this.theme.getFormInputLabel(this.getTitle());
    if (this.options.infoText) {
      this.infoButton = this.theme.getInfoButton(this.options.infoText);
    }

    this.reactContainer = document.createElement('div');
    this.input = this.reactContainer;
    this.container.appendChild(this.reactContainer);

    this.refreshValue();
  }

  destroy() {
    this.reactContainer && ReactDOM.unmountComponentAtNode(this.reactContainer);
  }
}


export default CustomReactSelectEditor;