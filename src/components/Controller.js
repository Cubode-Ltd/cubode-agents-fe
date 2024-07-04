class Controller {

    constructor() {
        this.canvas = document.querySelector('cb-canvas');
        this.layers = [];
    }

    addLayer(options) {
        const layer = document.createElement('cb-layer');
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                layer.setAttribute(key, options[key]);
            }
        }
        this.canvas.appendChild(layer);
        this.layers.push(layer);
        return layer;
    }

    addCubeToLayer(layer, cubeOptions) {
        const cube = document.createElement('cb-cube');
        //const shape = document.createElement('cb-shape');
        for (const key in cubeOptions) {
            if (cubeOptions.hasOwnProperty(key)) {
                //shape.setAttribute(key, cubeOptions[key]);
                cube.setAttribute(key, cubeOptions[key]);
            }
        }
        //cube.appendChild(shape);
        layer.appendChild(cube);
    }
}

export default Controller;