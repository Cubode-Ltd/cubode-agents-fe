// ToggleButtonField.js
import React from 'react';
import { Field } from 'formik';

const ToggleButton = ({ field, form, value, label }) => {
  const isSelected = field.value === value;

  return (
    <button
      type="button"
      onClick={() => form.setFieldValue(field.name, value)}
      className={`no-select flex-grow mx-2 px-4 py-2 rounded border cursor-pointer text-sm text-black ${
        isSelected ? 'bg-gray-800 text-white' : 'bg-white border text-black'
      }`}
    >
      {label}
    </button>
  );
};

const CustomBooleanField = ({ field, form, options }) => (
  <div className="rounded border mt-3 py-2 px-1 flex justify-center items-center">
    {options.map((option, index) => (
      <React.Fragment key={option.value}>
        <ToggleButton
          field={field}
          form={form}
          value={option.value}
          label={option.label}
        />
        {index < options.length - 1 && (
          <div className="h-6 border-l mx-4"></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export default CustomBooleanField;
