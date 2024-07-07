import React, { useEffect, useRef } from 'react';
import { JSONEditor } from '@json-editor/json-editor';


const injectCustomStyles = (container) => {
  const style = document.createElement('style');
  style.innerHTML = `
    .je-header.je-object__title {
      margin-bottom: 20px;
      font-weight: 700;
      color: #4B5563; 
    }
    
    .je-object__container .je-indented-panel {
      border-width: 0px !important;
      margin:0 !important;
      padding:0 !important;
    }
    .errmsg {
      font-size: 0.75rem;
      color: #FCA5A5 !important; 
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
    });

    editor.on('change', () => {
      const formData = editor.getValue();
      if (onFormSubmit) {
        onFormSubmit(formData);
      }
    });

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
