import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import "../../../../css/main.css";

const ColorPickerField = ({ field, form }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (color) => {
    form.setFieldValue(field.name, color.hex);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="flex items-center no-select">
      <div 
        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
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
      <input
        type="text"
        value={field.value}
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        className="ml-3 p-1 rounded font-bold text-gray-700"
      />
    </div>
  );
};

export default ColorPickerField;
