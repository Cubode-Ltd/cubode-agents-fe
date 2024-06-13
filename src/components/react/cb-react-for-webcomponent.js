// MyReactComponent.jsx
import React from 'react';

const MyReactComponent = ({ data, onDataChange }) => {
  const handleChange = (event) => {
    const newData = event.target.value;
    onDataChange(newData);
  };

  return (
    <div>
      <h1>React Component inside a WebComponent It ROCKS!</h1>
      <input type="text" value={data} onChange={handleChange} />
    </div>
  );
};

export default MyReactComponent;