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

  return (
    <div className="dynamic-form relative border-2 rounded-md p-4 mb-4 shadow">
      <p className="text-md text-gray-700 font-semibold mb-2">{seriesTitle}</p>

      <Field name={`dynamicForms[${index}].seriesTitle`}>
        {({ field, form }) => (
          <input
            {...field}
            type="text"
            placeholder={`Series ${index + 1}`}
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
            <label htmlFor={`${key}-${index}`} className='text-sm font-bold'>{value.title}</label>
            <Field name={`dynamicForms[${index}].${key}`}>
              {({ field, form }) => {
                const Component = value.format === 'color' ? ColorPickerField :
                                  value.format === 'tagify' ? TagifyField :
                                  value.format === 'colorsDropdown' ? ColorsDropdownField :
                                  key.includes('Boolean') ? CustomBooleanField :
                                  undefined;
                return Component ? (
                  <Component field={field} form={form} options={value.enum} />
                ) : (
                  <input
                    {...field}
                    type="text"
                    className={value.options.inputAttributes.class}
                  />
                );
              }}
            </Field>
          </div>
        )
      ))}

      <div className="flex justify-end space-x-2 mt-4">
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
            className="bg-gray-50 shadow-sm hover:shadow-lg rounded-md border p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
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
    <div className="p-4 border rounded-md shadow-md relative">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <OnChangeHandler />

            {/* Normal Entries */}
            {Object.entries(formSchema.properties).map(([key, value]) => (
              key !== 'dynamicForms' && (
                <div key={key}>
                  <label htmlFor={key} className='text-sm font-bold'>{value.title}</label>
                  <Field name={key}>
                    {({ field, form }) => {
                      // These are the types of Fields
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
                          className={value.options.inputAttributes.class}
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
