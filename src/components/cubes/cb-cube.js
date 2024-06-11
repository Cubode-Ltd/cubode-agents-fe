import store, { updateCube } from '../../stores/cubesstore.js';
import { Resizable } from './Corners.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>@import "./css/main.css"</style>
    <cb-shape></cb-shape>
`;

class Cube extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        store.subscribe(() => {
            const state = store.getState();
            console.log("State Saved:", state);
        });
    }

    static get observedAttributes() {
        return ['top', 'left', 'width', 'height', 'type', 'color', 'fill-style'];  
    }

    connectedCallback() {
        this.style.position = 'absolute';
        //this.handles = new Resizable(this, () => this.render());

        if (!this.hasAttribute('slot')) {
            this.setAttribute('slot', 'cb-cube');
        }
        
        this.addEventListener('mousedown', e => {this.handleMouseDown(e)});
        document.addEventListener('mousemove', e => {this.handleMouseMove(e)});
        document.addEventListener('mouseup', e => {this.handleMouseUp(e)});
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'top') {
            this.style.top = `${newValue}px`;
        } else if (name === 'left') {
            this.style.left = `${newValue}px`;
        } else if (name === 'config') { 
            this.config = JSON.parse(newValue);
            this.updateComponent();
        }

        this.updateShapeAttribute(name, newValue); 
    }

    updateShapeAttribute(attrName, value) {
        // We pass all the property changes to the child Shape.
        const shape = this.shadowRoot.querySelector('cb-shape');
        if (shape) {
            shape.setAttribute(attrName, value);
        }
    }

    set configuration(config) {
        this.config = config;
        this.setAttribute('config', JSON.stringify(config));
        this.updateComponent();
    }

    get configuration() {
        return this.config;
    }

    get width() {
        return this.getAttribute('width');
    }

    get height() {
        return this.getAttribute('height');
    }

    get top() {
        return this.getAttribute('top');
    }

    set top(value) {
        this.setAttribute('top', value);
    }

    get left() {
        return this.getAttribute('left');
    }

    set left(value) {
        this.setAttribute('left', value);
    }

    handleMouseDown(event) {
        this.isDragging = true;
        this.startX = event.pageX - this.offsetLeft;
        this.startY = event.pageY - this.offsetTop;
        event.preventDefault();
    }

    handleMouseMove(event) {
        if (this.isDragging) {

            // const dim = document.querySelector('cb-canvas').getBoundingClientRect(); //parentLayer.getBoundingClientRect();

            // const parentLayer = this.parentElement;
            // const x = parentLayer.transform.x;
            // const y = parentLayer.transform.y;
            // const z = parentLayer.transform.zoom;

            // let mouseX = (event.clientX - dim.left) * 1 / z - x;
            // let mouseY = (event.clientY - dim.top) * 1 / z - y;
        
            // console.log(mouseX, mouseY)
            // // const shape = this.shadowRoot.querySelector('cb-shape');
            // this.left = mouseX;
            // this.top = mouseY;

            this.left = event.pageX - this.startX;
            this.top =  event.pageY - this.startY;
        }
    }

    handleMouseUp() {
        if (this.isDragging) {
            const newX = parseInt(this.style.left, 10);
            const newY = parseInt(this.style.top, 10);
            store.dispatch(updateCube({
                id: this.id,
                updates: {
                    position: { x: newX, y: newY }
                }
            }));
        }
        this.isDragging = false;
        
    }
}

customElements.define('cb-cube', Cube);