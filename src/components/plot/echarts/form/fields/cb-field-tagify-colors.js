import React, { useRef, useEffect, useState } from 'react';
import Tagify from '@yaireo/tagify';
import * as d3 from 'd3';
import "../../../../../css/main.css";

const ColorScale = {
  colorScales: {
    YlGnBu: d3.interpolateYlGnBu,
    Viridis: d3.interpolateViridis,
    Inferno: d3.interpolateInferno,
    Magma: d3.interpolateMagma,
    Plasma: d3.interpolatePlasma,
    Warm: d3.interpolateWarm,
    Cool: d3.interpolateCool,
    CubehelixDefault: d3.interpolateCubehelixDefault,
    BuGn: d3.interpolateBuGn,
    BuPu: d3.interpolateBuPu,
    GnBu: d3.interpolateGnBu,
    OrRd: d3.interpolateOrRd,
    PuBuGn: d3.interpolatePuBuGn,
    PuBu: d3.interpolatePuBu,
    PuRd: d3.interpolatePuRd,
    RdPu: d3.interpolateRdPu,
    YlGn: d3.interpolateYlGn,
    YlOrBr: d3.interpolateYlOrBr,
    YlOrRd: d3.interpolateYlOrRd,
    Turbo: d3.interpolateTurbo,
    Cividis: d3.interpolateCividis,
    Rainbow: d3.interpolateRainbow,
    Sinebow: d3.interpolateSinebow,
    Blues: d3.interpolateBlues,
    Greens: d3.interpolateGreens,
    Greys: d3.interpolateGreys,
    Purples: d3.interpolatePurples,
    Reds: d3.interpolateReds,
    Spectral: d3.interpolateSpectral,
    RdYlGn: d3.interpolateRdYlGn,
    RdYlBu: d3.interpolateRdYlBu,
    RdGy: d3.interpolateRdGy,
    RdBu: d3.interpolateRdBu,
    PiYG: d3.interpolatePiYG,
    PRGn: d3.interpolatePRGn,
    PuOr: d3.interpolatePuOr,
    BrBG: d3.interpolateBrBG
  }
};

const colorScalesWhitelist = Object.keys(ColorScale.colorScales).map((key, index) => ({
  value: index + 1,
  colorScale: key
}));

colorScalesWhitelist.push({
  value: colorScalesWhitelist.length + 1,
  colorScale: "Custom"
});

const AdvancedTagifyField = ({ field, form, title }) => {
  const tagifyInstance = useRef();
  const inputRef = useRef();
  const chevronRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    tagifyInstance.current = new Tagify(inputRef.current, {
      tagTextProp: 'colorScale',
      skipInvalid: true,
      maxTags: 2,
      whitelist: colorScalesWhitelist,
      userInput: false,
      dropdown: {
        closeOnSelect: false,
        enabled: 0,
        classname: "tags-look h-min-20",
        searchKeys: ['colorScale'],
        maxItems: 100
      },
      templates: {
        tag: tagRenderer,
        dropdownItem: dropDownRenderer,
      },
      transformTag: (tagData, originalData) => {
        const { colorScale, description } = parseColorScale(tagData.colorScale);
        tagData.colorScale = colorScale;
        tagData.description = description || tagData.description;
      }
    });

    const handleClickOutside = (event) => {
      const path = event.composedPath();
      const isClickInside = path.includes(inputRef.current) || path.includes(chevronRef.current);
      const isDropdownItem = path.some(el => el.classList && el.classList.contains('tagify__dropdown__item'));
      const isCloseChevron = path.some(el => el.classList && el.classList.contains('chevron-element-close'));

      if (!isClickInside && !isDropdownItem || isCloseChevron) {
        tagifyInstance.current.dropdown.hide.call(tagifyInstance.current);
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
        tagifyInstance.current.dropdown.hide.call(tagifyInstance.current);
        setDropdownOpen(false);
      } else {
        tagifyInstance.current.dropdown.show.call(tagifyInstance.current);
        setDropdownOpen(true);
      }
    };

    if (chevronRef.current) {
      chevronRef.current.addEventListener('mousedown', handleChevronClick);
    }

    document.addEventListener('mousedown', handleClickOutside);
    // Listen to Tagify dropdown events to update the state
    tagifyInstance.current.on('dropdown:show', () => setDropdownOpen(true));
    tagifyInstance.current.on('dropdown:hide', () => setDropdownOpen(false));

    // Handle tag add event to replace the existing tag with the new one
    tagifyInstance.current.on('add', (e) => {
      if (tagifyInstance.current.value.length > 1) {
        const newTag = e.detail.data;
        tagifyInstance.current.removeAllTags();
        tagifyInstance.current.addTags([newTag]);
        form.setFieldValue(field.name, e.detail.data.colorScale); 
      }
    });

    return () => {
      if (chevronRef.current) {
        chevronRef.current.removeEventListener('mousedown', handleChevronClick);
      }
      
      document.removeEventListener('mousedown', handleClickOutside);
      tagifyInstance.current.destroy();
      tagifyInstance.current.off('dropdown:show');
      tagifyInstance.current.off('dropdown:hide');
    };
  }, [field.name, form]);

  return (
    <div className="relative w-full mt-3">
      <input
        type="text"
        ref={inputRef}
        defaultValue={field.value}
        onChange={(e) => form.setFieldValue(field.name, extractColorScales(e.target.value))}
        className="w-full h-12 bg-white text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm p-1 rounded-md border-blue-gray-200 focus:border-gray-300"
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

function tagRenderer(tagData) {
  const colorScale = ColorScale.colorScales[tagData.colorScale];
  const backgroundColor = colorScale ? colorScale(0.5) : '#d4d4d4'; // Use 0.5 as a middle point to get a representative color.

  return `
    <tag title="${tagData.colorScale}"
        contenteditable='false'
        spellcheck='false'
        tabIndex="-1"
        class="tagify__tag flex select-none justify-between items-center rounded px-2 py-1 mb-1 shadow-md"
        style="background-color: ${backgroundColor}; color: black; min-width: calc(100% - 30px);"
        ${this.getAttributes(tagData)}>
      <span class='tagify__tag-text'>${tagData.colorScale}</span>
      <x title='' class='tagify__tag__removeBtn cursor-pointer' role='button' aria-label='remove tag'></x>
    </tag>
  `;
}

function dropDownRenderer(tagData) {
  // Just Render Custom
  if (tagData.colorScale === "Custom") {
    return `
      <div ${this.getAttributes(tagData)}
          class='tagify__dropdown__item flex items-center p-1 cursor-pointer bg-gray-50 hover:bg-gray-100 ${tagData.class ? tagData.class : ""}'
          tabindex="0"
          role="option">
        <div class="flex-1 py-2 ">
          <span class="font-bold">Custom Colors</span>
        </div>
      </div>
    `;
  }

  const colorScale = ColorScale.colorScales[tagData.colorScale];
  const colors = Array.from({length: 10}, (_, i) => colorScale(i / 9));
  const colorBar = colors.map(color => `<span style="background-color:${color};width:10%;height:20px;display:inline-block;"></span>`).join('');

  return `
    <div ${this.getAttributes(tagData)}
        class='tagify__dropdown__item flex items-center p-2 cursor-pointer hover:bg-gray-100 ${tagData.class ? tagData.class : ""}'
        tabindex="0"
        role="option">
      <div class="flex-1">
        <strong class="mr-2">${tagData.colorScale}</strong>
        <div class="mt-1">${colorBar}</div>
      </div>
    </div>
  `;
}

function parseColorScale(value) {
  // Assuming value is in the format "Color Scale Name <optional description>"
  var parts = value.split(/<(.*?)>/g),
      colorScale = parts[0].trim(),
      description = parts[1]?.replace(/<(.*?)>/g, '').trim();

  return { colorScale, description }
}

function extractColorScales(input) {
  if (input === "" || input === undefined) {
    return []
  }
  const tags = JSON.parse(input);
  const colorScales = tags.map(tag => tag.colorScale);
  return colorScales;
}
export default AdvancedTagifyField;
