export class PanZoom {
    constructor(trigger, element, updateCallBack) {
        this.element = element;
        this.trigger = trigger;
        this.onUpdate = updateCallBack;
        this.scale = 1;
        this.originX = 0;
        this.originY = 0;
        this.isPanning = false;
    }

    initialize() {
        this.trigger.addEventListener('wheel', this.handleZoom.bind(this));
        this.trigger.addEventListener('mousedown', this.startPan.bind(this));
        window.addEventListener('mousemove', this.handlePan.bind(this));
        window.addEventListener('mouseup', this.endPan.bind(this));
    }

    handleZoom(event) {
        event.preventDefault();

        const rect = this.element.getBoundingClientRect();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
    
        const x = window.innerWidth / 2 - centerX;
        const y = window.innerHeight / 2 - centerY;
    
        const delta = event.deltaY * -0.0005;
        const oldScale = this.scale;
        this.scale += delta;
        this.scale = Math.max(0.1, Math.min(4, this.scale));
    
        // Adjust the origin points to always center on the middle of the viewport
        this.originX = x - (x - this.originX) * (this.scale / oldScale);
        this.originY = y - (y - this.originY) * (this.scale / oldScale);
        
        this.updateTransform();
    }

    startPan(event) {
        if (event.button === 1) {
            this.isPanning = true;
            this.startX = event.clientX - this.originX;
            this.startY = event.clientY - this.originY;
        }
    }

    handlePan(event) {
        if (this.isPanning) {
            event.preventDefault();
            this.originX = event.clientX - this.startX;
            this.originY = event.clientY - this.startY;
            this.updateTransform();
        }
    }

    endPan(event) {
        if (event.button === 1) {
            this.isPanning = false;
        }
    }

    transform() {
        const transform = `translate(${this.originX}px, ${this.originY}px) scale(${this.scale})`;
        this.element.style.transform = transform;
    }

    updateTransform() {
        this.transform();
        if (this.onUpdate) {
            this.onUpdate(this.scale, this.originX, this.originY);
        }
    }
}
