import React, { useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';
import "../../../../css/main.css";

const TagifyField = ({ field, form }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    // Initialize Tagify
    tagifyRef.current = new Tagify(inputRef.current, {
      tagTextProp: 'name',
      dropdown: {
        closeOnSelect: false,
        enabled: 0,
        classname: 'users-list',
        searchKeys: ['name', 'email']
      },
      templates: {
        tag: tagTemplate,
        dropdownItem: suggestionItemTemplate,
        dropdownHeader: dropdownHeaderTemplate
      },
      whitelist: [
        // Your whitelist items...
      ],
    });

    // Sync Tagify value with Formik
    tagifyRef.current.on('change', (e) => {
      form.setFieldValue(field.name, tagifyRef.current.value);
    });

    // Cleanup on unmount
    return () => {
      tagifyRef.current.destroy();
    };
  }, [field.name, form]);

  return (
    <div className="w-full">
      <input
        type="text"
        ref={inputRef}
        defaultValue={field.value}
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

function tagTemplate(tagData) {
  return `
    <tag title="${tagData.email}"
        contenteditable='false'
        spellcheck='false'
        tabIndex="-1"
        class="tagify__tag ${tagData.class ? tagData.class : ""}"
        ${this.getAttributes(tagData)}>
      <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
      <div>
        <div class='tagify__tag__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>
        <span class='tagify__tag-text'>${tagData.name}</span>
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
      <strong>${tagData.name}</strong>
      <span>${tagData.email}</span>
    </div>
  `;
}

function dropdownHeaderTemplate(suggestions) {
  return `
    <header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
      <strong style='grid-area: add'>${this.value.length ? `Add Remaining` : 'Add All'}</strong>
      <span style='grid-area: remaining'>${suggestions.length} members</span>
      <a class='remove-all-tags'>Remove all</a>
    </header>
  `;
}

export default TagifyField;
