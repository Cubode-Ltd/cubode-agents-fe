import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';

import TagifyField from './fields/cb-field-tagify';
import SliderField from './fields/cb-field-slider';
import ColorsDropdownField from './fields/cb-field-tagify-colors';
import ColorPickerField from './fields/cb-field-color';
import CustomBooleanField from './fields/cb-field-boolean';

const OnChangeHandler = ({ onChange }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, [values, onChange]);
  return null;
};
const DynamicForm = ({ index, removeForm, addForm, isLastForm, allowAddForms, formSchema }) => {
  const [seriesTitle, setSeriesTitle] = useState(`Series ${index + 1}`);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`dynamic-form relative ${index === 0 ? 'border-t' : ''} border-b px-6 py-4 no-select`}>
      <div className="flex justify-between items-center py-2">
        <p className="text-sm">{seriesTitle}</p>
        <button type="button" onClick={toggleDropdown} className="focus:outline-none">
          {isDropdownOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {isDropdownOpen && (
        <div className="mt-3">
          <Field name={`dynamicForms[${index}].series-title`} defaultValue="">
            {({ field, form }) => (
              <input
                {...field}
                type="text"
                placeholder="Series Title"
                className={formSchema.properties.dynamicForms.items.properties['series-title'].options.inputAttributes.class}
                onChange={(e) => {
                  form.setFieldValue(field.name, e.target.value);
                  setSeriesTitle(e.target.value);
                }}
              />
            )}
          </Field>

          {Object.entries(formSchema.properties.dynamicForms.items.properties).map(([key, value]) => (
            key !== 'series-title' && (
              <div className="mt-2" key={key}>
                <Field name={`dynamicForms[${index}].${key}`} defaultValue="">
                  {({ field, form }) => {
                    const Component = value.format === 'color' ? ColorPickerField :
                      value.format === 'tagify' ? TagifyField :
                      value.format === 'colorsDropdown' ? ColorsDropdownField :
                      value.format === 'slider' ? SliderField :
                      key.includes('Boolean') ? CustomBooleanField :

                      value.format === 'customBoolean' ? CustomBooleanField :

                      undefined;

                    return (
                      <>
                        {Component !== ColorPickerField && (
                          <label htmlFor={`${key}-${index}`} className="text-sm">{value.title}</label>
                        )}
                        {Component ? (
                          <Component field={field} form={form} options={value.enum} title={value.title} singleValue={value.maxtags} />
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
                className="flex bg-gray-50 shadow-sm hover:shadow-lg rounded-md border py-2 px-3"
              >
                <p className="text-sm mr-3">Add</p>
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

const FormComponent = ({ allowAddForms = true, formSchema, initialValues, onFormSubmit, onFormChange }) => {
  const [dynamicForms, setDynamicForms] = useState(initialValues.dynamicForms);

  const addForm = () => {
    setDynamicForms([...dynamicForms, { 'series-title': '', 'series-column-category': '', 'series-column-values': '', 'series-aggregation': '', 'series-primary-color': '', 'series-secondary-color': '' }]);
  };

  const removeForm = (index) => {
    setDynamicForms(dynamicForms.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <Formik
        initialValues={{ ...initialValues, dynamicForms }}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form>
            <OnChangeHandler onChange={onFormChange} />

            {/* Normal Entries */}
            {Object.entries(formSchema.properties).map(([key, value]) => (
              key !== 'dynamicForms' && (
                <div key={key} className="px-6 mb-4 no-select">
                  <label htmlFor={key} className="text-sm">{value.title}</label>
                  <Field name={key} defaultValue="">
                    {({ field, form }) => {
                      const Component = value.format === 'color' ? ColorPickerField :
                        value.format === 'tagify' ? TagifyField :
                        value.format === 'colorsDropdown' ? ColorsDropdownField :
                        value.format === 'slider' ? SliderField :
                        value.format === 'customBoolean' ? CustomBooleanField :
                        undefined;
                      return Component ? (
                        <Component field={field} form={form} options={value.enum} title={value.title} singleValue={value.maxtags} />
                      ) : (
                        <input
                          {...field}
                          type="text"
                          className={`${value.options.inputAttributes.class} mt-3`}
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