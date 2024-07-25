import React from 'react';
import "../../../../../css/main.css";

const SliderField = ({ field, form, min, max, step, title }) => {
  const handleChange = (e) => {
    form.setFieldValue(field.name, e.target.value);
  };

  return (
    <div className="w-full mt-3 no-select">
      <input
        id="slider-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={field.value || min}
        className="cb-custom-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 no-select"
        onChange={handleChange}
      />
      <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SliderField;
