import React, { useRef, useEffect, useState } from 'react';
import Tagify from '@yaireo/tagify';
import "../../../../css/main.css";

const TagifyField = ({ field, form, options, singleValue }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    tagifyRef.current = new Tagify(inputRef.current, {
      whitelist: options,
      maxTags: singleValue ? 1 : Infinity,
      dropdown: {
        maxItems: 20,
        classname: 'tags-look',
        enabled: 0,
        closeOnSelect: false
      },
      templates: {
        tag: tagTemplate,
        dropdownItem: suggestionItemTemplate,
      },
    });
    return () => {};
  }, [field.name, form, options, singleValue]);

  return (
    <div className="relative w-full">
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

export default TagifyField;
