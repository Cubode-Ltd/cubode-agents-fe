import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import "../../../../../css/main.css";

const ColorPickerField = ({ field, form, title }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (color) => {
    form.setFieldValue(field.name, color.hex);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="flex items-center no-select border rounded-md p-2">
      <div 
        className="w-8 h-8 border border-gray-300 rounded-md cursor-pointer"
        style={{ backgroundColor: field.value }}
        onClick={togglePicker}
      />
      {showPicker && (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={togglePicker}></div>
          <SketchPicker
            color={field.value}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      )}
      <p className="ml-2 text-sm">{title} :</p>
      <input
        type="text"
        value={field.value}
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        className="ml-3 p-1 rounded text-gray-700 w-24 text-sm"
      />
    </div>
  );
};

export default ColorPickerField;
