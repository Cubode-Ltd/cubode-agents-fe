import React, { useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';

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
        {
          value: 1,
          name: "Justinian Hattersley",
          avatar: "https://i.pravatar.cc/80?img=1",
          email: "jhattersley0@ucsd.edu",
          team: "A"
        },
        {
          value: 2,
          name: "Antons Esson",
          avatar: "https://i.pravatar.cc/80?img=2",
          email: "aesson1@ning.com",
          team: "B"
        },
        {
          value: 3,
          name: "Ardeen Batisse",
          avatar: "https://i.pravatar.cc/80?img=3",
          email: "abatisse2@nih.gov",
          team: "A"
        },
        {
          value: 4,
          name: "Graeme Yellowley",
          avatar: "https://i.pravatar.cc/80?img=4",
          email: "gyellowley3@behance.net",
          team: "C"
        },
        {
          value: 5,
          name: "Dido Wilford",
          avatar: "https://i.pravatar.cc/80?img=5",
          email: "dwilford4@jugem.jp",
          team: "A"
        },
        {
          value: 6,
          name: "Celesta Orwin",
          avatar: "https://i.pravatar.cc/80?img=6",
          email: "corwin5@meetup.com",
          team: "C"
        },
        {
          value: 7,
          name: "Sally Main",
          avatar: "https://i.pravatar.cc/80?img=7",
          email: "smain6@techcrunch.com",
          team: "A"
        },
        {
          value: 8,
          name: "Grethel Haysman",
          avatar: "https://i.pravatar.cc/80?img=8",
          email: "ghaysman7@mashable.com",
          team: "B"
        },
        {
          value: 9,
          name: "Marvin Mandrake",
          avatar: "https://i.pravatar.cc/80?img=9",
          email: "mmandrake8@sourceforge.net",
          team: "B"
        },
        {
          value: 10,
          name: "Corrie Tidey",
          avatar: "https://i.pravatar.cc/80?img=10",
          email: "ctidey9@youtube.com",
          team: "A"
        },
        {
          value: 11,
          name: "foo",
          avatar: "https://i.pravatar.cc/80?img=11",
          email: "foo@bar.com",
          team: "B"
        },
        {
          value: 12,
          name: "foo",
          avatar: "https://i.pravatar.cc/80?img=12",
          email: "foo.aaa@foo.com",
          team: "A"
        },
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
    <input
      type="text"
      ref={inputRef}
      defaultValue={field.value}
      onChange={(e) => form.setFieldValue(field.name, e.target.value)}
    />
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
