import React from 'react';
import FormComponent from './cb-form-json';


const schema1 = {
  title: 'Form 1',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: { type: 'string', title: 'First name' },
    lastName: { type: 'string', title: 'Last name' },
    age: { type: 'number', title: 'Age' },
  },
};

const schema2 = {
  title: 'Form 2',
  type: 'object',
  required: ['email'],
  properties: {
    email: { type: 'string', title: 'Email' },
    password: { type: 'string', title: 'Password' },
  },
};

const FormsInstanceTest = () => {
  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <h2>Schema 1</h2>
      <FormComponent schema={schema1} />
      <h2>Schema 2</h2>
      <FormComponent schema={schema2} />
    </div>
  );
};

export default FormsInstanceTest;