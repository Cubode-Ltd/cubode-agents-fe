import React, { useRef, useEffect, useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import TagifyField from '../fields/cb-field-tagify';
import ColorsDropdownField from '../fields/cb-field-tagify-colors';
import ColorPickerField from '../fields/cb-field-color';
import CustomBooleanField from '../fields/cb-field-boolean';

const OnChangeHandler = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log('Form values changed:', values);
  }, [values]);

  return null;
};

const DynamicForm = ({ index, removeForm, addForm, isLastForm, allowAddForms, formSchema }) => {
  const [seriesTitle, setSeriesTitle] = useState(`Series ${index + 1}`);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`dynamic-form relative ${index===0 ? 'border-t' : ''} border-b px-6 py-4`}>
      <div className="flex justify-between items-center py-2">
        <p className="text-sm ">{seriesTitle}</p>
        <button onClick={toggleDropdown} className="focus:outline-none">
          {isDropdownOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {isDropdownOpen && (
        <div class="mt-4">
          <Field name={`dynamicForms[${index}].seriesTitle`}>
            {({ field, form }) => (
              <input
                {...field}
                type="text"
                placeholder={`Series Name`}
                className={formSchema.properties.dynamicForms.items.properties.seriesTitle.options.inputAttributes.class}
                onChange={(e) => {
                  form.setFieldValue(field.name, e.target.value);
                  setSeriesTitle(e.target.value);
                }}
              />
            )}
          </Field>

          {Object.entries(formSchema.properties.dynamicForms.items.properties).map(([key, value]) => (
            key !== 'seriesTitle' && (
              <div className='mt-2' key={key}>
                <Field name={`dynamicForms[${index}].${key}`}>
                  {({ field, form }) => {
                    const Component = value.format === 'color' ? ColorPickerField :
                                      value.format === 'tagify' ? TagifyField :
                                      value.format === 'colorsDropdown' ? ColorsDropdownField :
                                      key.includes('Boolean') ? CustomBooleanField :
                                      undefined;

                    return (
                      <>
                        {Component !== ColorPickerField && (
                          <label htmlFor={`${key}-${index}`} className='text-sm'>{value.title}</label>
                        )}
                        {Component ? (
                          <Component field={field} form={form} options={value.enum} title={value.title} />
                        ) : (
                          <input
                            {...field}
                            type="text"
                            className={`${value.options.inputAttributes.class} ${Component !== ColorPickerField ? 'mt-2' : ''}`}
                          />
                        )}
                      </>
                    );
                  }}
                </Field>
              </div>
            )
          ))}

          <div className="flex justify-end space-x-2 mt-8">
            {index !== 0 && (
              <button
                type="button"
                onClick={() => removeForm(index)}
                className="bg-red-50 shadow-sm hover:shadow-lg rounded-md border p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-800">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {allowAddForms && isLastForm && (
              <button
                type="button"
                onClick={addForm}
                className="flex bg-gray-50 shadow-sm hover:shadow-lg rounded-md border p-2"
              >
                <p class="text-sm mr-3">Add</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
             
    </div>
  );
};

const FormComponent = ({ allowAddForms = true, formSchema, initialValues, onFormSubmit }) => {
  const [dynamicForms, setDynamicForms] = useState(initialValues.dynamicForms);

  const addForm = () => {
    setDynamicForms([...dynamicForms, { seriesTitle: '', columnCategory: '', columnValues: '', seriesColorspace: '', seriesCustomColor1: '', seriesCustomColor2: '' }]);
  };

  const removeForm = (index) => {
    setDynamicForms(dynamicForms.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <OnChangeHandler />

            {/* Normal Entries */}
            {Object.entries(formSchema.properties).map(([key, value]) => (
              key !== 'dynamicForms' && (
                <div key={key} class="px-6 mb-4">
                  <label htmlFor={key} className='text-sm'>{value.title}</label>
                  <Field name={key}>
                    {({ field, form }) => {
                      const Component = value.format === 'color' ? ColorPickerField :
                                        value.format === 'tagify' ? TagifyField :
                                        value.format === 'colorsDropdown' ? ColorsDropdownField :
                                        value.format === 'customBoolean' ? CustomBooleanField :
                                        undefined;
                      return Component ? (
                        <Component field={field} form={form} options={value.enum} />
                      ) : (
                        <input
                          {...field}
                          type="text"
                          className={`${value.options.inputAttributes.class} mt-4`}
                        />
                      );
                    }}
                  </Field>
                </div>
              )
            ))}

            {/* Dynamic Entries */}
            {dynamicForms.map((form, index) => (
              <DynamicForm
                key={index}
                index={index}
                removeForm={removeForm}
                addForm={addForm}
                isLastForm={index === dynamicForms.length - 1}
                allowAddForms={allowAddForms}
                formSchema={formSchema}
              />
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
