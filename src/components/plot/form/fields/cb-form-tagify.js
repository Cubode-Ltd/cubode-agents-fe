import React, { useRef, useEffect, useState } from 'react';
import Tagify from '@yaireo/tagify';
import "../../../../css/main.css";

const TagifyField = ({ field, form, options, singleValue }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();
  const chevronRef = useRef();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Initialize Tagify
    tagifyRef.current = new Tagify(inputRef.current, {
      tagTextProp: 'value',
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
        dropdownHeader: dropdownHeaderTemplate
      },
    });

    // Trigger dropdown on focus
    tagifyRef.current.on('focus', () => {
      setDropdownVisible(true);
      tagifyRef.current.dropdown.show(inputRef.current.value);
    });

    // Sync Tagify value with Formik
    tagifyRef.current.on('change', (e) => {
      form.setFieldValue(field.name, e.detail.tagify.value.map(tag => tag.value));
    });

    // Add event listener for "Remove all" link
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-all-tags')) {
        tagifyRef.current.removeAllTags();
      }
    });

    // Add event listener for "Add All" link
    document.addEventListener('click', (e) => {
      if (e.target.dataset.selector === 'tagify-suggestions-header' && !tagifyRef.current.value.length) {
        tagifyRef.current.addTags(options);
      }
    });

    // Hide dropdown on outside click
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) &&
          chevronRef.current && !chevronRef.current.contains(event.target)) {
        setDropdownVisible(false);
        tagifyRef.current.dropdown.hide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup on unmount
    return () => {
      tagifyRef.current.destroy();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [field.name, form, options, singleValue]);

  return (
    <div className="relative w-full no-select">
      <input
        type="text"
        ref={inputRef}
        defaultValue={field.value}
        className="w-full border border-gray-300 rounded pr-8"
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
        class="tagify__tag no-select ${tagData.class ? tagData.class : ""}"
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
        class='tagify__dropdown__item no-select ${tagData.class ? tagData.class : ""}'
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
    <header data-selector='tagify-suggestions-header' class="flex justify-between items-center bg-gray-100 p-2 border-b border-gray-300">
      <strong style='grid-area: add'>${this.value.length ? `Add Remaining` : 'Add All'}</strong>
      <span style='grid-area: remaining'>${suggestions.length} options</span>
      <a class='remove-all-tags cursor-pointer'>Remove all</a>
    </header>
  `;
}

export default TagifyField;
