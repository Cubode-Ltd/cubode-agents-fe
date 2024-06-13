import React, { useState } from 'react';
import ReactDOM from "react-dom/client"

import Form from '@rjsf/core';
import r2wc from "react-to-webcomponent"

const FormComponent = ({ schema }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (data) => {
    setFormData(data.formData);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <Form
        schema={schema}
        formData={formData}
        onChange={handleChange}
      />
    </div>
  );
};

customElements.define(
    'cb-form', 
    r2wc(FormComponent, React, ReactDOM, {
        props: {
            schema: "object",
        }
    }));

