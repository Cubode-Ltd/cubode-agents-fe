import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, useDefaults: true });
addFormats(ajv);

const FormComponent = ({ schema, schemaUI, onFormSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = ({ errors, data }) => {
    setFormData(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
        <JsonForms
          schema={schema}
          uischema={schemaUI}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          ajv={ajv}
          onChange={handleChange}
        />
    </div>
  );
};

export default FormComponent;