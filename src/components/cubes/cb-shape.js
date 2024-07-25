import rough from 'roughjs';

const shapeTemplate = document.createElement('template');
shapeTemplate.innerHTML = `
    <style>@import "css/index.css";</style>
    <svg class="cb-shape absolute cursor-grab overflow-visible" width="0" height="0">
        <slot></slot>
    </svg>`;

class Shape extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(shapeTemplate.content.cloneNode(true));
        this.svgElement = this.shadowRoot.querySelector('.cb-shape');
        this.currentShape = null;
        this.rc = rough.svg(this.svgElement);
    }

    connectedCallback() {
        this.parent = this.parentElement;
        this.render();
    }

    addChild(child) {
        this.svgElement.appendChild(child);
    }

    static get observedAttributes() {
        return ['left', 'top', 'width', 'height', 'type', 'color', 'fill-style'];
    }

    get top() {
        return this.getAttribute('top');
    }

    get left() {
        return this.getAttribute('left');
    }

    get width() {
        return this.getAttribute('width');
    }

    get height() {
        return this.getAttribute('height');
    }

    set width(newValue) {
        this.setAttribute('width', newValue);
        this.svgElement.setAttribute('width', parseInt(newValue)); // Directly update the SVG element
        // this.handles.updateHandlePositions(); // Update handles if needed
    }

    set height(newValue) {
        this.setAttribute('height', newValue);
        this.svgElement.setAttribute('height', parseInt(newValue)); // Directly update the SVG element
        // this.handles.updateHandlePositions(); // Update handles if needed
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateSVGAttributes(name, newValue);
            this.render();
        }
    }

    updateSVGAttributes(name, newValue) {
        switch (name) {
            case 'width':
            case 'height':
                this.svgElement.setAttribute(name, parseInt(newValue));
                break;
        }
    }

    updateShapeAttributes(shape, type) {
        const width = parseInt(this.getAttribute('width'), 10);
        const height = parseInt(this.getAttribute('height'), 10);
        const color = this.getAttribute('color');
        const fillStyle = this.getAttribute('fill-style') || 'hachure';
        const strokeColor = 'black';
        const strokeWidth = 1.5;

        if (type.includes('rough')) { // For RoughJS, we may need to regenerate the shape entirely due to its nature
            this.svgElement.removeChild(shape);
            this.currentShape = this.createRoughShape(type, width, height, { color, strokeColor, strokeWidth, fillStyle });
            this.svgElement.appendChild(this.currentShape);
        } else { // For regular SVG shapes, just update the attributes
            shape.setAttribute('width', width - 20);
            shape.setAttribute('height', height - 20);
            shape.setAttribute('fill', color);
            shape.setAttribute('stroke', strokeColor);
            shape.setAttribute('stroke-width', strokeWidth);
            if (type === 'circle') {
                shape.setAttribute('cx', width / 2);
                shape.setAttribute('cy', height / 2);
                shape.setAttribute('r', Math.min(width, height) / 2 - 10);
            } else if (type === 'triangle') { // Recalculate the path data for triangles
                const points = [
                    { x: 10, y: height - 10 },
                    { x: 10, y: 10 },
                    { x: width, y: 10 + (height - 20) / 2 }
                ];
                const pathData = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;
                shape.setAttribute('d', pathData);
            }
        }
    }

    clearShapes() {
        const shapeElements = this.svgElement.querySelectorAll('.shape-element');
        shapeElements.forEach(element => {
            this.svgElement.removeChild(element);
        });
    }

    render() {
        const type = this.getAttribute('type') || 'rect';
        if (!this.currentShape || this.currentShape.getAttribute('data-type') !== type) {
            this.clearShapes();
            this.currentShape = this.createShape(type);
            if (this.currentShape) {
                this.svgElement.appendChild(this.currentShape);
                this.currentShape.setAttribute('data-type', type);
                this.currentShape.classList.add('shape-element'); 
                this.svgElement.classList.add('cursor-pointer');
            }
        }
        // this.handles.updatePositions();
        this.updateShapeAttributes(this.currentShape, type);
    }

    createShape(type) {
        if (type ==undefined) {
            type = 'rect';
            return this.createRegularShape(type);
        }
        if (type.includes('rough')) {
            return this.createRoughShape(type);
        } else {
            return this.createRegularShape(type);
        }
    }

    createRoughShape(type) {
        const width = parseInt(this.getAttribute('width'), 10);
        const height = parseInt(this.getAttribute('height'), 10);
        const color = this.getAttribute('color');
        const fillStyle = this.getAttribute('fill-style') || 'hachure'; 
        const strokeColor = 'black';  
        const strokeWidth = 1.5;
        let shapeOptions = {
            fill: color,
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            roughness: 2.5,
            fillStyle: fillStyle
        };

        switch (type) {
            case 'rect-rough':
                return this.rc.rectangle(10, 10, width - 20, height - 20, shapeOptions);
            case 'circle-rough':
                return this.rc.circle(width / 2, height / 2, Math.min(width, height) - 20, shapeOptions);
            case 'triangle-rough':
                const points = [
                    { x: 10, y: height - 10 },
                    { x: width / 2, y: 10 },
                    { x: width - 10, y: height - 10 }
                ];
                return this.rc.polygon(points, shapeOptions);
            default:
                return null;
        }
    }

    createRegularShape(type) {
        const width = parseInt(this.getAttribute('width'), 10);
        const height = parseInt(this.getAttribute('height'), 10);
        const color = this.getAttribute('color');
        const strokeColor = 'black';
        const strokeWidth = 1.5;

        switch (type) {
            case 'rect':
                let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', 10);
                rect.setAttribute('y', 10);
                rect.setAttribute('width', width - 20);
                rect.setAttribute('height', height - 20);
                rect.setAttribute('fill', color);
                rect.setAttribute('stroke', strokeColor);
                rect.setAttribute('stroke-width', strokeWidth);
                rect.setAttribute('rx', 5); // Rounded corners
                rect.setAttribute('ry', 5);
                return rect;
            case 'circle':
                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', width / 2);
                circle.setAttribute('cy', height / 2);
                circle.setAttribute('r', Math.min(width, height) / 2 - 10);
                circle.setAttribute('fill', color);
                circle.setAttribute('stroke', strokeColor);
                circle.setAttribute('stroke-width', strokeWidth);
                return circle;
            case 'triangle':
                let triangle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const points = [
                    { x: 10, y: height - 10 },
                    { x: width / 2, y: 10 },
                    { x: width - 10, y: height - 10 }
                ];
                let pathData = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;
                triangle.setAttribute('d', pathData);
                triangle.setAttribute('fill', color);
                triangle.setAttribute('stroke', strokeColor);
                triangle.setAttribute('stroke-width', strokeWidth);
                return triangle;
            default:
                return null;
        }
    }
}

customElements.define('cb-shape', Shape);
