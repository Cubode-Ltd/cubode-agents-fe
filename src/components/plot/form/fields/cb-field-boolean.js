// ToggleButtonField.js
import React from 'react';
import { Field } from 'formik';

const ToggleButton = ({ field, form, value, label }) => {
  const isSelected = field.value === value;

  return (
    <button
      type="button"
      onClick={() => form.setFieldValue(field.name, value)}
      className={`no-select min-w-28 px-4 py-2 mr-3 rounded border cursor-pointer text-sm text-white ${
        isSelected ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      }`}
    >
      {label}
    </button>
  );
};

const CustomBooleanField = ({ field, form, options }) => (
    <div className="border rounded py-2 px-1 flex">
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

