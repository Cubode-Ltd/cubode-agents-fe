import React, { useRef, useEffect, useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { v4 as uuidv4 } from 'uuid';

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
  dynamicForms: [{ id: uuidv4() }]
}

const OnChangeHandler = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log('Form values changed:', values);
  }, [values]);

  return null;
};

const DynamicForm = ({ id, index, removeForm }) => (
  <div className="dynamic-form relative border rounded-md p-4 mb-4 shadow">
    <p className="text-md font-semibold mb-2 uppercase">Series {index + 1}</p>

    <div className='mt-2'>
      <label htmlFor={`column-category-${id}`} className='text-sm font-bold'>Column Category</label>
      <Field name={`dynamicForms.${id}.columnCategory`}>
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
      <label htmlFor={`column-value-${id}`} className='text-sm font-bold'>Column Values</label>
      <Field name={`dynamicForms.${id}.columnValue`}>
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
      <label htmlFor={`series-colorspace-${id}`} className='text-sm font-bold'>Color space</label>
      <Field name={`dynamicForms.${id}.seriesColorspace`}>
        {({ field, form }) => (
          <ColorsDropdownField
            field={field}
            form={form}
            options={options}
            singleValue={true}
          />
        )}
      </Field>
    </div>

    <div className='mt-2'>
      <label htmlFor={`series-custom-color-1-${id}`} className='text-sm font-bold'>Custom Color 1</label>
      <Field name={`dynamicForms.${id}.seriesCustomColor1`} component={ColorPickerField} />
    </div>

    <div className='mt-2'>
      <label htmlFor={`series-custom-color-2-${id}`} className='text-sm font-bold'>Custom Color 2</label>
      <Field name={`dynamicForms.${id}.seriesCustomColor2`} component={ColorPickerField} />
    </div>




    {index !== 0 && (
      <button
        type="button"
        onClick={() => removeForm(id)}
        className="bg-gray-50 shadow-sm hover:shadow rounded-md border absolute bottom-2 right-10"  
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-800">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

const BarPlotForm = () => {
  const [dynamicForms, setDynamicForms] = useState([{ id: uuidv4() }]);

  const addForm = () => {
    setDynamicForms([...dynamicForms, { id: uuidv4() }]);
  };

  const removeForm = (id) => {
    setDynamicForms(dynamicForms.filter((form) => form.id !== id));
  };

  return (
    <div className="p-4 border rounded-md shadow-md relative">
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

            {dynamicForms.map((form, index) => (
              <DynamicForm key={form.id} id={form.id} index={index} removeForm={removeForm} />
            ))}

            <div className="absolute bottom-14 right-12 flex space-x-4">
              <button
                type="button"
                onClick={addForm}
                className="bg-gray-50 shadow-sm hover:shadow rounded-md border absolute mt-2 mr-2 text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BarPlotForm;
