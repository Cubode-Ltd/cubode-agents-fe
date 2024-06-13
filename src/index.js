import React from 'react';
import ReactDOM from 'react-dom';

// Import of the WebComponents
import "./components/cb-canvas.js"
import "./components/canvas/cb-canvas-background.js"
import "./components/canvas/cb-canvas-controls.js"
import "./components/canvas/cb-canvas-svg.js"
import "./components/canvas/cb-canvas-layer.js"
import "./components/canvas/cb-canvas-main.js" 
import "./components/cubes/cb-shape.js"
import "./components/cubes/cb-cube.js"
import "./components/layout/panels/cb-sidepanel.js"

// Components related to Visualization
import "./components/layout/cb-container.js"
import "./components/layout/cb-data-upload.js"
import "./components/plot/echarts/cb-echarts-barplot.js"
import "./components/plot/cb-plot-container.js"
import "./components/ai/cb-ai-input.js"

// Import React Components
import "./components/react/cb-react-compiled-test.js" // Directly Compiled from React
import "./components/react/cb-webcomponet-with-react.js" // React embedded inside WebComponent
import TestComponent from './components/react/cb-react-basic-integration.js'; // To integrate directly in a root element (classic way of using react)




// Integrating React with Vanilla

// Basic Integration of React just using react-root (not scalable to use as elements coming from B.E.)
const reactContainer = document.getElementById('react-root');
ReactDOM.render(<TestComponent />, reactContainer);


// import Controller from "./Controller.js"
// const controller = new Controller();
// const layer1 = controller.addLayer({ id: 'layer1' });
// controller.addCubeToLayer(layer1, { top: '0', left: '0', width: '150', height: '100', type: 'rect', color: 'red', "fill-style": "hachure"});
// controller.addCubeToLayer(layer1, { width: '200', height: '200', type: 'triangle-rough', color: 'blue', "fill-style": "solid" });
// controller.addCubeToLayer(layer1, { width: '200', height: '200', type: 'circle-rough', color: 'green', "fill-style": "zigzag" });
// controller.addCubeToLayer(layer1, { width: '200', height: '200', type: 'triangle-rough', color: 'pink', "fill-style": "cross-hatch" });
// controller.addCubeToLayer(layer1, { width: '200', height: '200', type: 'rect-rough', color: 'gray', "fill-style": "dots" });
// controller.addCubeToLayer(layer1, { width: '200', height: '200', type: 'triangle-rough', color: 'pink', "fill-style": "sunburst" });
// controller.addCubeToLayer(layer1, { width: '200', height: '200', type: 'rect-rough', color: 'gray', "fill-style": "dashed" });
// controller.addCubeToLayer(layer1, { width: '200', height: '200', type: 'rect-rough', color: 'gray', "fill-style": "zigzag-line" });
