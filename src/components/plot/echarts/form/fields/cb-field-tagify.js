import React, { useRef, useEffect, useState } from 'react';
import Tagify from '@yaireo/tagify';
import "../../../../../css/main.css";

const TagifyField = ({ field, form, options, singleValue, title }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();
  const chevronRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    tagifyRef.current = new Tagify(inputRef.current, {
      whitelist: options,
      maxTags: singleValue ? 2 : Infinity,
      placeholder: title,
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

    const handleClickOutside = (event) => {
      const path = event.composedPath();
      const isClickInside = path.includes(inputRef.current) || path.includes(chevronRef.current);
      const isDropdownItem = path.some(el => el.classList && el.classList.contains('tagify__dropdown__item'));
      const isCloseChevron = path.some(el => el.classList && el.classList.contains('chevron-element-close'));

      if (!isClickInside && !isDropdownItem || isCloseChevron) {
        tagifyRef.current.dropdown.hide.call(tagifyRef.current);
        setDropdownOpen(false);
      }
    };

    const handleChevronClick = (event) => {
      const path = event.composedPath();
      const isCloseChevron = path.some(el => el.classList && el.classList.contains('chevron-element-close'));
      if (isCloseChevron) {
        return;
      }

      if (dropdownOpen) {
        tagifyRef.current.dropdown.hide.call(tagifyRef.current);
        setDropdownOpen(false);
      } else {
        tagifyRef.current.dropdown.show.call(tagifyRef.current);
        setDropdownOpen(true);
      }
    };

    if (chevronRef.current) {
      chevronRef.current.addEventListener('mousedown', handleChevronClick);
    }
    document.addEventListener('mousedown', handleClickOutside);

    // Listen to Tagify dropdown events to update the state
    tagifyRef.current.on('dropdown:show', () => setDropdownOpen(true));
    tagifyRef.current.on('dropdown:hide', () => setDropdownOpen(false));

    // Handle tag add event to replace the existing tag with the new one
    tagifyRef.current.on('add', (e) => {
      if (singleValue && tagifyRef.current.value.length > 1) {
        const newTag = e.detail.data;
        tagifyRef.current.removeAllTags();
        tagifyRef.current.addTags([newTag]);
        form.setFieldValue(field.name, [newTag.value]);
      } else {
        form.setFieldValue(field.name, tagifyRef.current.value.map(tag => tag.value));
      }
    });

    return () => {
      if (chevronRef.current) {
        chevronRef.current.removeEventListener('mousedown', handleChevronClick);
      }
      document.removeEventListener('mousedown', handleClickOutside);
      tagifyRef.current.off('dropdown:show');
      tagifyRef.current.off('dropdown:hide');
      tagifyRef.current.off('add');
    };
  }, [field.name, form, options, singleValue, title]);

  return (
    <div className="relative w-full mt-3">
      <input
        type="text"
        ref={inputRef}
        defaultValue={field.value}
        placeholder={title}
        className="w-full bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm p-1 rounded-md border-blue-gray-200 focus:border-gray-300"
        onChange={(e) => form.setFieldValue(field.name, extractColorScales(e.target.value))}
      />
      <span 
        ref={chevronRef} 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
        {dropdownOpen ? (
          <svg className="chevron-element-close" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg className="chevron-element-open" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
    </div>
  );
};

function tagTemplate(tagData) {
  return `
    <tag title="${tagData.value}"
        contenteditable='false'
        spellcheck='false'
        tabIndex="-1"
        class="tagify__tag no-select rounded-full bg-blue-100 ${tagData.class ? tagData.class : ""}"

        ${this.getAttributes(tagData)}>
      <x class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
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

function extractColorScales(input) {
    if (input === "" || input === undefined) {
      return []
  }
  const tags = JSON.parse(input);
  const colorScales = tags.map(tag => tag.value);
  return colorScales;
}

export default TagifyField;
