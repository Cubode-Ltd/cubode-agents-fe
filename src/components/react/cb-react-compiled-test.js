// Using the package react-to-webcomponent that transforms directly a react component to a webcomponent.

import React from 'react';
import ReactDOM from "react-dom/client"
import ChildComponent from './cb-react-child-compiled-test';

// Compile
import r2wc from "react-to-webcomponent"

// Class based view component
// class ParentComponent extends Component {
//   render() {
//     const { name } = this.props;
//     return (
//       <div>
//         <h1>Hello, {name}!</h1>
//         <ChildComponent message="This is a child component" />
//       </div>
//     );
//   }
// }

// Functional Component
const ParentComponent = ({ name = 'Cubode is Rocks' }) => {
  return (
    <div>
      <h1>React Component Compiled, {name}!</h1>
      <ChildComponent message="This is a child component inside the compiled" />
    </div>
  );
};

const MyWebComponent = r2wc(ParentComponent, React, ReactDOM, {
  props: {
    name: "string",
  }
});
customElements.define('react-webcomponent-compiled', MyWebComponent);
