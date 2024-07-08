import React, { useRef, useEffect, useState } from 'react';

import { Formik, Form, Field, useFormikContext } from 'formik';

// Fields
import TagifyField from '../fields/cb-field-tagify';
import ColorsDropdownField from '../fields/cb-field-tagify-colors';
import ColorPickerField from '../fields/cb-field-color';
import CustomBooleanField from '../fields/cb-field-boolean';

const options = [
  "Column Name 1", "Column Name 2",
  "Column Name 3", "Column Name 6",
  "Column Name 4", "Column Name 7",
  "Column Name 5", "Column Name 8",
];

const showOptions = [
  { value: 'show', label: 'Show' },
  { value: 'hide', label: 'Hide' },
];

const selectOptions = [
  { value: 'option1', label: 'Column 1' },
  { value: 'option2', label: 'Column 2' },
  { value: 'option3', label: 'Column 3' },
];

const initialValues = { 
  showBackgroundField: 'show',
}

const OnChangeHandler = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log('Form values changed:', values);
  }, [values]);

  return null;
};

const BarPlotForm = () => (
  <div className="p-4 border rounded-md shadow-md">
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <OnChangeHandler />
          
          <div>
            <label htmlFor="chart-title" className='text-sm font-bold'>Chart Title</label>
            <Field
              className="w-full p-2 border rounded-md"
              type="string"
              name="chart-title"
              placeholder="Title"
            />
          </div>

          <div>
            <label htmlFor="chart-subtitle" className='text-sm font-bold'>Chart Sub Title</label>
            <Field
              className="w-full p-2 border rounded-md"
              type="string"
              name="chart-subtitle"
              placeholder="Sub title"
            />
          </div>

          <div>
            <label htmlFor="xaxis-label" className='text-sm font-bold'>X Axis Label</label>
            <Field
              className="w-full p-2 border rounded-md"
              type="string"
              name="xaxis-label"
              placeholder="Label"
            />
          </div>

          <div>
            <label htmlFor="yaxis-label" className='text-sm font-bold'>Y Axis Label</label>
            <Field
              className="w-full p-2 border rounded-md"
              type="string"
              name="yaxis-label"
              placeholder="Label"
            />
          </div>

          <div>
            <label htmlFor="showBackgroundField" className='text-sm font-bold'>Show Background</label>
            <Field className="w-full mt-3 p-2 border rounded-md" name="showBackgroundField">         
              {({ field, form }) => (
                <CustomBooleanField field={field} form={form} options={showOptions} />
              )}
            </Field>
          </div>
          
          <div className="dynamic-form">
            <div>
              <label htmlFor="column-category" className='text-sm font-bold'>Column Category</label>
              <Field name="column-category" as="select" className="w-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-xl border-blue-gray-200 focus:border-gray-300">
                {selectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>

            <div className='mt-2'>
              <label htmlFor="column-value" className='text-sm font-bold'>Column Values</label>
              <Field name="column-value">
                {({ field, form }) => (
                  <TagifyField
                    field={field}
                    form={form}
                    options={options}
                    singleValue={true}
                  />
                )}
              </Field>
            </div>

            <div className='mt-2'>
              <label htmlFor="series-colorspace" className='text-sm font-bold'>Color space</label>
              <Field name="series-colorspace">
                {({ field, form }) => (
                  <ColorsDropdownField
                    field={field}
                    form={form}
                    options={options}
                    singleValue={true} // Set to true to limit to one input
                  />
                )}
              </Field>
            </div>
  
            <div className='mt-2'>
              <label htmlFor="series-custom-color-1" className='text-sm font-bold'>Custom Color 1</label>
              <Field name="series-custom-color-1" component={ColorPickerField} />
            </div>

            <div className='mt-2'>
              <label htmlFor="series-custom-color-2" className='text-sm font-bold'>Custom Color 2</label>
              <Field name="series-custom-color-2" component={ColorPickerField} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default BarPlotForm;
