import React, { useRef, useEffect, useState } from 'react';
import Tagify from '@yaireo/tagify';
import "../../../../css/main.css";

const TagifyField = ({ field, form, options, singleValue }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();
  const chevronRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      console.log("click:", isCloseChevron);
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

    chevronRef.current.addEventListener('mousedown', handleChevronClick);
    document.addEventListener('mousedown', handleClickOutside);

    // Listen to Tagify dropdown events to update the state
    tagifyRef.current.on('dropdown:show', () => setDropdownOpen(true));
    tagifyRef.current.on('dropdown:hide', () => setDropdownOpen(false));

    return () => {
      chevronRef.current.removeEventListener('click', handleChevronClick);
      document.removeEventListener('mousedown', handleClickOutside);
      tagifyRef.current.off('dropdown:show');
      tagifyRef.current.off('dropdown:hide');
    };
  }, [field.name, form, options, singleValue]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        ref={inputRef}
        defaultValue={field.value}
        className="w-full p-1 border border-gray-300 rounded"
        onChange={(e) => form.setFieldValue(field.name, extractColorScales(e.target.value))}
      />
      <span 
        ref={chevronRef} 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
        {dropdownOpen ? (
          <svg class="chevron-element-close" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg class="chevron-element-open" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        class="tagify__tag no-select rounded-md ${tagData.class ? tagData.class : ""}"
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
  const tags = JSON.parse(input);
  const colorScales = tags.map(tag => tag.value);
  return colorScales;
}

export default TagifyField;
