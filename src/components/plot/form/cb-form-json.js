import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';


const FormComponent = ({ schema, schemaUI, onFormSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (data) => {
    setFormData(data.formData);
  };

  const handleSubmit = ({ formData }) => {
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <Form
        schema={schema}
        uiSchema={schemaUI}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        validator={validator}
      />
    </div>
  );
};

export default FormComponent;