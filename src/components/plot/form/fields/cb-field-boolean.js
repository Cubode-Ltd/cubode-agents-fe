// ToggleButtonField.js
import React from 'react';
import { Field } from 'formik';

const ToggleButton = ({ field, form, value, label }) => {
  const isSelected = field.value === value;

  return (
    <button
      type="button"
      onClick={() => form.setFieldValue(field.name, value)}
      className={`no-select min-w-16 px-4 py-2 mx-1 rounded p-1 border cursor-pointer text-white ${
        isSelected ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      }`}
    >
      {label}
    </button>
  );
};

const CustomBooleanField = ({ field, form, options }) => (
    <div className="border rounded p-2 flex">
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          field={field}
          form={form}
          value={option.value}
          label={option.label}
        />
      ))}
    </div>
  );
  
export default CustomBooleanField;


