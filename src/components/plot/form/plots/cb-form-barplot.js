import React from 'react';
import { Formik, Form, Field } from 'formik';
import { SketchPicker } from 'react-color';
import TagifyField from './cb-form-tagify';

class FormikComponent extends React.Component {
  render() {
    return (
      <div className="p-4 border rounded-md shadow-md bg-green-700">
        <h1 className="text-2xl font-bold mb-4">Formik Inside Web Component</h1>
        <Formik
          initialValues={{ email: '', colors: '', color: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-4">
              <Field
                className="w-full p-2 border rounded-md"
                type="email"
                name="email"
                placeholder="Email"
              />

              <div>
                <label htmlFor="tags">Tags</label>
                <Field name="tags" component={TagifyField} />
              </div>

              <div>
                <label htmlFor="color">Pick a Color</label>
                <SketchPicker
                  color={values.color}
                  onChangeComplete={(color) => setFieldValue('color', color.hex)}
                />
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
  }
}

export default FormikComponent;
