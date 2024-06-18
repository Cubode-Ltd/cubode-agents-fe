import React, { useEffect, useRef } from 'react';
import { JSONEditor } from '@json-editor/json-editor';
import '../../../css/main.css'; // Ensure this path is correct

const injectCustomStyles = (container) => {
  const style = document.createElement('style');
  style.innerHTML = `
    div[data-schematype]:not([data-schematype="object"]):hover {
      background-color: transparent !important;
    }
  `;
  container.appendChild(style);
};

const FormComponent = ({ schema, schemaUI, onFormSubmit }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new JSONEditor(editorRef.current, {
      schema: schema,
      disable_collapse: true,
      disable_edit_json: true,
      disable_properties: true,
      theme: 'tailwind',
    });

    editor.on('change', () => {
      const formData = editor.getValue();
      if (onFormSubmit) {
        onFormSubmit(formData);
      }
    });

    // Inject custom styles
    injectCustomStyles(editorRef.current);

    return () => {
      editor.destroy();
    };
  }, [schema, onFormSubmit]);

  return (
    <div ref={editorRef} />
  );
};

export default FormComponent;
