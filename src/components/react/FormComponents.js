import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const schema = {
  type: "object",
  properties: {
    title: { type: "string", title: "Title", default: "Pie Chart" },
    // Just to showcase input filds
    prop1: { type: "string", title: "prop1" },
    prop2: { type: "string", title: "prop2" },
    colorScale: {
      type: "string",
      // title: "Choose a color",
      enum: ["Viridis", "YlGnBu", "Magma", "Plasma"],
      default: "Viridis",
    },
  },
};

const uiSchema = {
  title: {
    "ui:widget": "text",
    "ui:options": {
      classNames: "input input-bordered w-full my-2",
    },
  },
  prop1: {
    "ui:widget": "text",
    "ui:options": {
      classNames: "input input-bordered w-full my-2",
    },
  },
  prop2: {
    "ui:widget": "text",
    "ui:options": {
      classNames: "input input-bordered w-full my-2",
    },
  },
  colorScale: {
    "ui:widget": "select",
    "ui:options": {
      classNames: "input input-bordered w-full my-2 pb-5",
    },
  },
};

const FormComponent = ({ onSubmit }) => {
  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
      >
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};
export default FormComponent;
