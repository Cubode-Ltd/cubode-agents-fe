import React, { useEffect, useRef } from 'react';
import { JSONEditor } from '@json-editor/json-editor';
import Tagify from '@yaireo/tagify'


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

const TagifyField = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const tagify = new Tagify(inputRef.current, {
      whitelist: props.options.enum,
      dropdown: {
        maxItems: 20,           // max items to show in the suggestions dropdown
        classname: "tags-look", // custom class for this dropdown, so it could be styled differently
        enabled: 0,             // show suggestions on focus
        closeOnSelect: false    // keep the dropdown open after selecting a suggestion
      }
    });

    tagify.on('change', (e) => {
      props.onChange(e.target.value);
    });

    // Set initial value
    tagify.addTags(props.value || []);

    return () => {
      tagify.destroy();
    };
  }, [props]);

  return <input type="text" ref={inputRef} />;
};

const FormComponent = ({ schema, schemaUI, onFormSubmit }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    JSONEditor.defaults.editors.tagify = TagifyField;

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
