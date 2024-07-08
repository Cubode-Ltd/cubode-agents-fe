import React from 'react';
import { Formik, Form, Field } from 'formik';

// Fields
import TagifyField from './fields/cb-form-tagify';
import ColorPickerField from './fields/cb-field-color';

const options = [
  "A# .NET", "A# (Axiom)", "A-0 System", "A+", "A++"
];

const FormikComponent = () => (
  <div className="p-4 border rounded-md shadow-md">
    <Formik
      initialValues={{ email: '', tags: [], color: '#ffffff' }}
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
            <label htmlFor="email">Email</label>
            <Field
              className="w-full p-2 border rounded-md"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="tags">Tags</label>
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

          <div className="mb-4">
            <label htmlFor="color" className="block text-gray-700">Color</label>
            <Field name="color" component={ColorPickerField} />
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
