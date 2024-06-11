export class Resizable {

    constructor(cube) {
        this.cube = cube;
        this.svgElement = cube;
        this.init();
    }

    hide() {
    }

    show() {
    }

    init() {
        const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.width = '100%'; 
        container.style.height = '100%'; 
        document.body.appendChild(container); 
    
        positions.forEach(pos => {
            const handle = document.createElement('div');
            handle.style.width = '12px';
            handle.style.height = '12px';
            handle.style.backgroundColor = 'white';
            handle.style.border = '1.5px solid black';
            handle.style.borderRadius = '3px';
            handle.style.boxSizing = 'border-box';
            handle.style.position = 'absolute';
            handle.setAttribute('slot', '');
            handle.classList.add('resize-handle', pos);
            handle.classList.add('cb-corner');

            this.svgElement.shadowRoot.appendChild(handle);
        });
        this.updatePositions();
        this.attachEventListeners();
    }

    updatePositions() {
        const width = parseInt(this.svgElement.getAttribute('width'));
        const height = parseInt(this.svgElement.getAttribute('height'));
    
        const topLeft = this.svgElement.shadowRoot.querySelector('.top-left');
        topLeft.style.left = '0px';
        topLeft.style.top = '0px';
    
        const topRight = this.svgElement.shadowRoot.querySelector('.top-right');
        topRight.style.left = `${width - 12}px`;
        topRight.style.top = '0px';
    
        const bottomLeft = this.svgElement.shadowRoot.querySelector('.bottom-left');
        bottomLeft.style.left = '0px';
        bottomLeft.style.top = `${height - 12}px`;
    
        const bottomRight = this.svgElement.shadowRoot.querySelector('.bottom-right');
        bottomRight.style.left = `${width - 12}px`;
        bottomRight.style.top = `${height - 12}px`;
    }

    attachEventListeners() {
        const handles = this.svgElement.shadowRoot.querySelectorAll('.resize-handle');
        handles.forEach(handle => {
            handle.addEventListener('mousedown', (event) => this.startResize(handle, event));
        });
        document.addEventListener('mousemove', this.handleResize.bind(this));
        document.addEventListener('mouseup', this.stopResize.bind(this));
    }

    startResize(handle, event) {
        this.currentHandle = handle;
        this.isResizing = true;

        const dim = event.srcElement.getBoundingClientRect();
        this.xMouseSave = event.clientX - dim.left;
        this.yMouseSave = event.clientY - dim.top;
        event.stopPropagation();
        event.preventDefault();
    }

    handleResize(event) {
        if (!this.isResizing) { 
            return;
        }
    
        // Example: Assume some transformation or offset exists, adjust accordingly
        const zoomLevel = 1; // Simplified, as we might not have zoom functionality
        const translation = { x: 0, y: 0 }; // No translation in this simplified example
    
        const rect = this.svgElement //.getBoundingClientRect();
        // const offsetX = (event.clientX - rect.left) // zoomLevel - translation.x;
        // const offsetY = (event.clientY - rect.top)  // zoomLevel - translation.y;
    
        const offsetX = (event.offsetX - this.xMouseSave)
        const offsetY = (event.clientY - this.yMouseSave)  // zoomLevel - translation.y;
    

        let newWidth, newHeight, newX, newY;

        newX = Number(rect.left)
        newY = Number(rect.top)
        newWidth = Number(rect.width)
        newHeight = Number(rect.height)
    
        // Adjustments based on which corner is being dragged
        //console.log(this.currentHandle)
        switch (this.currentHandle.classList[1]) {
            
            case 'bottom-right':
                newWidth = offsetX - rect.left;
                newHeight = offsetY - rect.top;
                break;
            case 'top-right':
                newY = offsetY;
                newWidth = offsetX - rect.left;
                newHeight = (rect.top + rect.height) - offsetY;
                break;
            case 'top-left':
                newX = offsetX;
                newY = offsetY;
                newWidth = (rect.left + rect.width) - offsetX;
                newHeight = rect.top - offsetY;
                break;
            case 'bottom-left':
                newX = offsetX;
                newWidth = (rect.left + rect.width) - offsetX;
                newHeight = offsetY - rect.top;
                break;
        }
    
        if (newWidth < 50) newWidth = 50
        if (newHeight < 50) newHeight = 50

        this.svgElement.setAttribute('width', newWidth);
        this.svgElement.setAttribute('height', newHeight);
        this.svgElement.setAttribute('top', newY);
        this.svgElement.setAttribute('left', newX);
    
        console.log(newX, newY, newWidth, newHeight)
        this.updatePositions();
    }
    

    stopResize() {
        this.isResizing = false;
    }
}
