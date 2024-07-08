import React from 'react';
import { Formik, Form, Field } from 'formik';

// Fields
import TagifyField from './fields/cb-form-tagify';
import AdvancedTagifyField from './fields/cb-form-tagify-advanced';
import ColorsDropdownField from './fields/cb-form-tagify-colors';
import ColorPickerField from './fields/cb-field-color';
import CustomBooleanField from './fields/cb-field-boolean';



const options = [
  "Column Name 1", "Column Name 2",
  "Column Name 3", "Column Name 6",
  "Column Name 4", "Column Name 7",
  "Column Name 5", "Column Name 8",
];

const booleanOptions = [
  { value: 'blastoiser', label: 'Show' },
  { value: 'B', label: ' Hide' },
];

const FormikComponent = () => (
  <div className="p-4 border rounded-md shadow-md no-select">
    <Formik
      initialValues={{ email: '', tags: [], color: '#ffffff', myBooleanField: 'blastoiser' }} // Set 'A' as the default value
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">

          <div>
            <label htmlFor="email">Normal Column</label>
            <Field
              className="w-full p-2 border rounded-md"
              type="email"
              name="email"
              placeholder="Column"
            />
          </div>

          <div>
            <label htmlFor="tags">Column Value</label>
            <Field name="tags">
              {({ field, form }) => (
                <TagifyField
                  field={field}
                  form={form}
                  options={options}
                  singleValue={true} // Set to true to limit to one input
                />
              )}
            </Field>
          </div>

          <div>
            <label htmlFor="tags">Column Value</label>
            <Field name="tags">
              {({ field, form }) => (
                <AdvancedTagifyField
                  field={field}
                  form={form}
                  options={options}
                  singleValue={true} // Set to true to limit to one input
                />
              )}
            </Field>
          </div>

          <div>
            <label htmlFor="tags">Column Value</label>
            <Field name="tags">
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

          <div className="mb-4">
            <label htmlFor="color" className="block text-gray-700">Color</label>
            <Field name="color" component={ColorPickerField} />
          </div>

          <div>
            <label htmlFor="myBooleanField">Custom Boolean Field</label>
            <Field name="myBooleanField">
              {({ field, form }) => (
                <CustomBooleanField field={field} form={form} options={booleanOptions} />
              )}
            </Field>
          </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormikComponent;
