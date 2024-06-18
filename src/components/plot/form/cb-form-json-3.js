import React, { useEffect, useRef } from 'react';
import { JSONEditor } from '@json-editor/json-editor'

const FormComponent = ({ schema, schemaUI, onFormSubmit }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    var editor = new JSONEditor(editorRef.current, {
      schema: schema,
      disable_collapse: true,
      disable_edit_json: true,
      disable_properties: true,
      theme: 'tailwind'
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

  // return <div ref={editorRef} />;
  return <div ref={editorRef} className="mt-2 p-4 border-3 border-blue-300 rounded-md border-green-700" />;

};

export default FormComponent;