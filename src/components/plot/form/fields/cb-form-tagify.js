import React, { useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';
import "../../../../css/main.css";

const TagifyField = ({ field, form, options, singleValue }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    // Initialize Tagify
    tagifyRef.current = new Tagify(inputRef.current, {
      tagTextProp: 'value',
      whitelist: options,
      maxTags: singleValue ? 1 : Infinity,
      dropdown: {
        maxItems: 20,           // <- maximum allowed rendered suggestions
        classname: 'tags-look', // <- custom classname for this dropdown, so it could be targeted
        enabled: 0,             // <- show suggestions on focus
        closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
      },
      templates: {
        tag: tagTemplate,
        dropdownItem: suggestionItemTemplate,
        dropdownHeader: dropdownHeaderTemplate
      },
    });

    // Sync Tagify value with Formik
    tagifyRef.current.on('change', (e) => {
      form.setFieldValue(field.name, e.detail.tagify.value.map(tag => tag.value));
    });

    // Cleanup on unmount
    return () => {
      tagifyRef.current.destroy();
    };
  }, [field.name, form, options, singleValue]);

  return (
    <div className="w-full">
      <input
        type="text"
        ref={inputRef}
        defaultValue={field.value}
        className="w-full p-1 border border-gray-300 rounded"
      />
    </div>
  );
};

function tagTemplate(tagData) {
  return `
    <tag title="${tagData.value}"
        contenteditable='false'
        spellcheck='false'
        tabIndex="-1"
        class="tagify__tag no-select rounded-md ${tagData.class ? tagData.class : ""}"
        ${this.getAttributes(tagData)}>
      <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
      <div>
        <div class='tagify__tag__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>
        <span class='tagify__tag-text'>${tagData.value}</span>
      </div>
    </tag>
  `;
}

function suggestionItemTemplate(tagData) {
  return `
    <div ${this.getAttributes(tagData)}
        class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
        tabindex="0"
        role="option">
      ${tagData.avatar ? `
        <div class='tagify__dropdown__item__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>` : ''
      }
      <strong>${tagData.value}</strong>
    </div>
  `;
}

function dropdownHeaderTemplate(suggestions) {
  return `
    <header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
      <strong style='grid-area: add'>${this.value.length ? `Add Remaining` : 'Add All'}</strong>
      <span style='grid-area: remaining'>${suggestions.length} options</span>
      <a class='remove-all-tags'>Remove all</a>
    </header>
  `;
}

export default TagifyField;
