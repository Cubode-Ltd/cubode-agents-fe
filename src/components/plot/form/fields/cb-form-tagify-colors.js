import React, { useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';
import * as d3 from 'd3';

import "../../../../css/main.css";

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

const AdvancedTagifyField = ({ field, form }) => {
  const tagifyRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const tagifyInstance = new Tagify(inputRef.current, {
      tagTextProp: 'colorScale',
      skipInvalid: true,
      maxTags: 1,
      dropdown: {
        closeOnSelect: false,
        enabled: 0,
        classname: 'colorscales-list',
        searchKeys: ['colorScale'],
        maxItems: 100
      },
      templates: {
        tag: tagRenderer,
        dropdownItem: dropDownRenderer,
      },
      whitelist: colorScalesWhitelist
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
        className="w-full p-1 border border-gray-300 rounded"
      />
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
        class="tagify__tag flex select-none justify-between items-center w-4/5 rounded px-2 py-1 mb-1 shadow-md"
        style="background-color: ${backgroundColor}; color: black;"
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

function onSelectSuggestion(e, tagifyInstance) {
  if (e.detail.event.target.matches('.remove-all-tags')) {
    tagifyInstance.removeAllTags();
  } else if (e.detail.elm.classList.contains(`${tagifyInstance.settings.classNames.dropdownItem}__addAll`)) {
    tagifyInstance.dropdown.selectAll();
  }
}

function onEditStart({detail: {tag, data}}, tagifyInstance) {
  tagifyInstance.setTagTextNode(tag, `${data.colorScale}`);
}

export default AdvancedTagifyField;
