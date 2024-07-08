import React, { useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';
import "../../../../css/main.css"; // Ensure this includes Tailwind CSS

const AdvancedTagifyField = ({ field, form }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const tagifyInstance = new Tagify(inputRef.current, {
      tagTextProp: 'name',
      skipInvalid: true,
      dropdown: {
        closeOnSelect: false,
        enabled: 0,
        classname: 'users-list',
        searchKeys: ['name', 'email']
      },
      templates: {
        tag: advancedTagTemplate,
        dropdownItem: advancedSuggestionItemTemplate,
        dropdownHeader: advancedDropdownHeaderTemplate
      },
      whitelist: [
        {
          "value": 1,
          "name": "Justinian Hattersley",
          "avatar": "https://i.pravatar.cc/80?img=1",
          "email": "jhattersley0@ucsd.edu",
          "team": "A"
        },
        {
          "value": 2,
          "name": "Antons Esson",
          "avatar": "https://i.pravatar.cc/80?img=2",
          "email": "aesson1@ning.com",
          "team": "B"
        },
        {
          "value": 3,
          "name": "Ardeen Batisse",
          "avatar": "https://i.pravatar.cc/80?img=3",
          "email": "abatisse2@nih.gov",
          "team": "A"
        },
        {
          "value": 4,
          "name": "Graeme Yellowley",
          "avatar": "https://i.pravatar.cc/80?img=4",
          "email": "gyellowley3@behance.net",
          "team": "C"
        },
        {
          "value": 5,
          "name": "Dido Wilford",
          "avatar": "https://i.pravatar.cc/80?img=5",
          "email": "dwilford4@jugem.jp",
          "team": "A"
        },
        {
          "value": 6,
          "name": "Celesta Orwin",
          "avatar": "https://i.pravatar.cc/80?img=6",
          "email": "corwin5@meetup.com",
          "team": "C"
        },
        {
          "value": 7,
          "name": "Sally Main",
          "avatar": "https://i.pravatar.cc/80?img=7",
          "email": "smain6@techcrunch.com",
          "team": "A"
        },
        {
          "value": 8,
          "name": "Grethel Haysman",
          "avatar": "https://i.pravatar.cc/80?img=8",
          "email": "ghaysman7@mashable.com",
          "team": "B"
        },
        {
          "value": 9,
          "name": "Marvin Mandrake",
          "avatar": "https://i.pravatar.cc/80?img=9",
          "email": "mmandrake8@sourceforge.net",
          "team": "B"
        },
        {
          "value": 10,
          "name": "Corrie Tidey",
          "avatar": "https://i.pravatar.cc/80?img=10",
          "email": "ctidey9@youtube.com",
          "team": "A"
        },
        {
          "value": 11,
          "name": "foo",
          "avatar": "https://i.pravatar.cc/80?img=11",
          "email": "foo@bar.com",
          "team": "B"
        },
        {
          "value": 12,
          "name": "foo",
          "avatar": "https://i.pravatar.cc/80?img=12",
          "email": "foo.aaa@foo.com",
          "team": "A"
        },
      ],
      transformTag: (tagData, originalData) => {
        var {name, email} = parseFullValue(tagData.name);
        tagData.name = name;
        tagData.email = email || tagData.email;
      },
      validate: ({name, email}) => {
        if (!email && name) {
          var parsed = parseFullValue(name);
          name = parsed.name;
          email = parsed.email;
        }
        if (!name) return "Missing name";
        if (!validateEmail(email)) return "Invalid email";
        return true;
      }
    });

    tagifyInstance.on('dropdown:select', (e) => onSelectSuggestion(e, tagifyInstance))
      .on('edit:start', (e) => onEditStart(e, tagifyInstance))
      .on('change', (e) => {
        form.setFieldValue(field.name, tagifyInstance.value);
      });

    tagifyRef.current = tagifyInstance;

    return () => {
      tagifyInstance.destroy();
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

function advancedTagTemplate(tagData) {
  return `
    <tag title="${tagData.email}"
        contenteditable='false'
        spellcheck='false'
        tabIndex="-1"
        class="tagify__tag inline-block text-sm text-white bg-blue-500 rounded px-2 py-1 mr-1 mb-1"
        ${this.getAttributes(tagData)}>
      <x title='' class='tagify__tag__removeBtn inline-block ml-1 text-xs cursor-pointer' role='button' aria-label='remove tag'>×</x>
      <div class="inline-flex items-center">
        <div class='tagify__tag__avatar-wrap w-4 h-4 rounded-full overflow-hidden bg-gray-200 mr-2'>
          <img onerror="this.style.visibility='hidden'" class="w-full h-full object-cover" src="${tagData.avatar}">
        </div>
        <span class='tagify__tag-text'>${tagData.name}</span>
      </div>
    </tag>
  `;
}

function advancedSuggestionItemTemplate(tagData) {
  return `
    <div ${this.getAttributes(tagData)}
        class='tagify__dropdown__item flex items-center p-2 cursor-pointer hover:bg-gray-100 ${tagData.class ? tagData.class : ""}'
        tabindex="0"
        role="option">
      ${tagData.avatar ? `
        <div class='tagify__dropdown__item__avatar-wrap w-9 h-9 rounded-full overflow-hidden bg-gray-200 mr-2'>
          <img onerror="this.style.visibility='hidden'" class="w-full h-full object-cover" src="${tagData.avatar}">
        </div>` : ''
      }
      <strong class="mr-2">${tagData.name}</strong>
      <span class="text-gray-500 text-sm">${tagData.email}</span>
    </div>
  `;
}

function advancedDropdownHeaderTemplate(suggestions) {
  return `
    <header data-selector='tagify-suggestions-header' class="flex justify-between items-center bg-gray-100 p-2 border-b border-gray-300">
      <strong class='text-sm'>${this.value.length ? `Add Remaining` : 'Add All'}</strong>
      <span class='text-sm text-gray-500'>${suggestions.length} members</span>
      <a class='remove-all-tags text-red-500 text-sm cursor-pointer'>Remove all</a>
    </header>
  `;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseFullValue(value) {
  var parts = value.split(/<(.*?)>/g),
      name = parts[0].trim(),
      email = parts[1]?.replace(/<(.*?)>/g, '').trim();

  return {name, email};
}

function onSelectSuggestion(e, tagifyInstance) {
  if (e.detail.event.target.matches('.remove-all-tags')) {
    tagifyInstance.removeAllTags();
  } else if (e.detail.elm.classList.contains(`${tagifyInstance.settings.classNames.dropdownItem}__addAll`)) {
    tagifyInstance.dropdown.selectAll();
  }
}

function onEditStart({detail: {tag, data}}, tagifyInstance) {
  tagifyInstance.setTagTextNode(tag, `${data.name} <${data.email}>`);
}

export default AdvancedTagifyField;
