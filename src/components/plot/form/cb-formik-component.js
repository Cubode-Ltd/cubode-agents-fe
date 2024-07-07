import React from 'react';
import { Formik, Form, Field } from 'formik';

class FormikComponent extends React.Component {
  render() {
    return (
      <div className="p-4 border rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Formik Inside Web Component</h1>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field
                className="w-full p-2 border rounded-md"
                type="email"
                name="email"
                placeholder="Email"
              />
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
  }
}

export default FormikComponent;
