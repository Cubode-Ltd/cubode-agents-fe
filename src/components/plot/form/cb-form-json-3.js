import React, { useEffect, useRef } from 'react';
// import JSONEditor from "@json-editor/json-editor";
import { JSONEditor } from '@json-editor/json-editor'


const FormComponent = ({ schema, schemaUI, onFormSubmit }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new JSONEditor(editorRef.current, {
      schema: schema,
      startval: schema.defaultValue || {},
      theme: 'tailwind',
      iconlib: "fontawesome4",
    });

    editor.on('change', () => {
      const formData = editor.getValue();
      if (onFormSubmit) {
        onFormSubmit(formData);
      }
    });

    return () => {
      editor.destroy();
    };
  }, [schema, onFormSubmit]);

  return <div ref={editorRef} />;
};

export default FormComponent;