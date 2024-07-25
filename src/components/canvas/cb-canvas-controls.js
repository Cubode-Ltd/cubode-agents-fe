const template = document.createElement('template');
template.innerHTML = `
    <style>@import "css/main.css";</style>

    <div id="cb-canvas-low-controls" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex bg-white dark:bg-gray-700 py-3 px-4 rounded-lg shadow-xl border">
        
        <button id="cb-canvas-low-zoom-in-button" type="button"
            class="w-6 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md" title="zoom in"
            aria-label="zoom in"><svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-white" viewBox="0 0 32 32">
                <path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path>
            </svg></button> <button
            class="bg-gray-50 dark:bg-gray-800 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md"
            title="zoom value" aria-label="zoom value">
            <p id="zoomValue" class="self-center text-xs dark:text-white whitespace-nowrap">80%</p>
        </button> 
        
        <button id="cb-canvas-low-zoom-out-button" type="button"
            class="w-6 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md" title="zoom out"
            aria-label="zoom out"><svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-white" viewBox="0 0 32 5">
                <path d="M0 0h32v4.2H0z"></path>
            </svg>
        </button> 
            
        <button id="cb-canvas-low-zoom-fit-button" type="button"
            class="w-6 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md" title="fit view"
            aria-label="fit view"><svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-white" viewBox="0 0 32 30">
                <path
                    d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z">
                </path>
            </svg>
        </button> 
            
        <button id="cb-canvas-low-change-background-button" type="button"
            class="w-6 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md" title="change background"
            aria-label="toggle interactivity"><svg xmlns="http://www.w3.org/2000/svg"
                class="dark:fill-white stroke-black dark:stroke-white" viewBox="0 0 8 8" stroke-linecap="round">
                <path d="m1 1H8M1 4H8M1 7H8" stroke-dasharray="0,3"></path>
            </svg>
        </button> 
            
        <button id="cb-canvas-low-clean-canvas-button" type="button"
            class="w-6 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md" title="new canvas"
            aria-label="toggle interactivity"><svg id="b2beee69-6116-43c8-9a86-73acdb0db0de" data-name="Layer 1"
                viewBox="0 0 247.71712 294.10001" version="1.1" xmlns="http://www.w3.org/2000/svg" class="dark:fill-white"
                xmlns:svg="http://www.w3.org/2000/svg">
                <defs id="defs4"></defs>
                <path id="path1-5"
                    style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:1.08836px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                    d="m 124.85828,256.02238 h 51.12523 l 26.69257,-207.681323 -77.8178,0.576677 z m -0.99945,0 H 77.613242 L 49.380589,48.341059 124.85828,48.917736 Z">
                </path>
                <polygon points="162.5,154.25 205.4,154.25 212,369.61 191.1,369.61 " style="display:inline;fill:#ffffff"
                    id="polygon3" transform="matrix(0.70606275,0,0,0.78007297,-48.852564,-53.108917)"></polygon>
                <polygon points="205.4,154.25 212,369.61 191.1,369.61 162.5,154.25 " style="display:inline;fill:#ffffff"
                    id="polygon3-5" transform="matrix(-0.70606275,0,0,0.78007297,302.89598,-52.691578)"></polygon>
                <rect x="114.66561" y="67.763733" width="24.712196" height="168.83119"
                    style="display:inline;fill:#ffffff;stroke-width:0.742146" id="rect4"></rect>
            </svg>
        </button> 
                
        <button id="cb-canvas-low-color-picker-button" type="button"
            class="w-6 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md"
            title="change background color" aria-label="toggle interactivity"><svg viewBox="0 0 127.38866 126.9017"
                version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg">
                <defs id="defs1"></defs>
                <g id="layer1" transform="translate(-75.60555,-141.02854)">
                    <path
                        style="fill:#ea4175;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2"
                        d="m 202.06816,204.3007 a 62.703094,62.703094 0 0 1 -18.36531,44.33779 L 139.36507,204.3007 Z">
                    </path>
                    <path
                        style="fill:#b81628;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2"
                        d="M 305.71178,45.916706 A 62.703094,62.703094 0 0 1 287.34647,90.254489 L 243.00868,45.916706 Z"
                        transform="rotate(45)"></path>
                    <path
                        style="fill:#40a3ea;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3"
                        d="m -141.95458,139.34653 a 63.202431,63.02433 0 0 1 -18.51157,44.56493 l -44.69086,-44.56493 z"
                        transform="rotate(-90)"></path>
                    <path
                        style="fill:#7112ec;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3-2"
                        d="M 16.57806,243.51202 A 61.990868,61.990868 0 0 1 -1.5786445,287.34619 L -45.412807,243.51202 Z"
                        transform="rotate(-45)"></path>
                    <path
                        style="fill:#fdd237;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-9"
                        d="M -76.56868,204.30072 A 62.703094,62.703094 0 0 1 -94.933991,248.6385 L -139.27177,204.30072 Z"
                        transform="scale(-1,1)"></path>
                    <path
                        style="fill:#ef4022;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-2"
                        d="M 108.68577,242.9427 A 62.703094,62.703094 0 0 1 90.320461,287.28049 L 45.982677,242.9427 Z"
                        transform="matrix(-0.70710678,0.70710678,0.70710678,0.70710678,0,0)"></path>
                    <path
                        style="fill:#73dbe9;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3-28"
                        d="m -141.9546,-139.25323 a 63.202431,63.02433 0 0 1 -18.51156,44.564926 l -44.69087,-44.564926 z"
                        transform="matrix(0,-1,-1,0,0,0)"></path>
                    <path
                        style="fill:#55a858;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3-2-9"
                        d="m -180.42171,46.512241 a 61.990868,61.990868 0 0 1 -18.15671,43.834163 l -43.83416,-43.834163 z"
                        transform="matrix(-0.70710678,-0.70710678,-0.70710678,0.70710678,0,0)"></path>
                    <ellipse
                        style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path1-6" cx="137.71439" cy="203.52464" rx="24.984402" ry="24.681284"></ellipse>
                </g>
            </svg>
        </button> 
            
        <input type="color" id="cb-canvas-low-color-picker-input" style="visibility: hidden; width: 0; height: 0; position: absolute;"> 
        
        <button id="cb-canvas-low-color-default-button"
            type="button" class="w-6 h-6 p-1 mx-1 border border-gray-100 rounded-sm shadow hover:shadow-md"
            title="default background color" aria-label="toggle interactivity"><svg viewBox="0 0 127.38866 126.9017"
                version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg">
                <defs id="defs1"></defs>
                <g id="layer1" transform="translate(-75.60555,-141.02854)">
                    <path
                        style="fill:#70a1cc;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2"
                        d="m 202.06816,204.3007 a 62.703094,62.703094 0 0 1 -18.36531,44.33779 L 139.36507,204.3007 Z">
                    </path>
                    <path
                        style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2"
                        d="M 305.71178,45.916706 A 62.703094,62.703094 0 0 1 287.34647,90.254489 L 243.00868,45.916706 Z"
                        transform="rotate(45)"></path>
                    <path
                        style="fill:#224664;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3"
                        d="m -141.95458,139.34653 a 63.202431,63.02433 0 0 1 -18.51157,44.56493 l -44.69086,-44.56493 z"
                        transform="rotate(-90)"></path>
                    <path
                        style="fill:#ffb19a;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3-2"
                        d="M 16.57806,243.51202 A 61.990868,61.990868 0 0 1 -1.5786445,287.34619 L -45.412807,243.51202 Z"
                        transform="rotate(-45)"></path>
                    <path
                        style="fill:#ffb19a;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-9"
                        d="M -76.56868,204.30072 A 62.703094,62.703094 0 0 1 -94.933991,248.6385 L -139.27177,204.30072 Z"
                        transform="scale(-1,1)"></path>
                    <path
                        style="fill:#224664;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-2"
                        d="M 108.68577,242.9427 A 62.703094,62.703094 0 0 1 90.320461,287.28049 L 45.982677,242.9427 Z"
                        transform="matrix(-0.70710678,0.70710678,0.70710678,0.70710678,0,0)"></path>
                    <path
                        style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3-28"
                        d="m -141.9546,-139.25323 a 63.202431,63.02433 0 0 1 -18.51156,44.564926 l -44.69087,-44.564926 z"
                        transform="matrix(0,-1,-1,0,0,0)"></path>
                    <path
                        style="fill:#70a1cc;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path2-2-3-2-9"
                        d="m -180.42171,46.512241 a 61.990868,61.990868 0 0 1 -18.15671,43.834163 l -43.83416,-43.834163 z"
                        transform="matrix(-0.70710678,-0.70710678,-0.70710678,0.70710678,0,0)"></path>
                    <ellipse
                        style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.85208;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none"
                        id="path1-6" cx="137.71439" cy="203.52464" rx="24.984402" ry="24.681284"></ellipse>
                </g>
            </svg>
        </button>
    </div>

`;

class CanvasControls extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.mainControls = this.shadowRoot.querySelector("#cb-canvas-low-controls");
        this.zoomInButton = this.shadowRoot.querySelector("#cb-canvas-low-zoom-in-button");
        this.zoomOutButton = this.shadowRoot.querySelector("#cb-canvas-low-zoom-out-button");
        this.zoomFitButton = this.shadowRoot.querySelector("#cb-canvas-low-zoom-fit-button");
        this.changeBackgroundButton = this.shadowRoot.querySelector("#cb-canvas-low-change-background-button");
        this.cleanCanvasButton = this.shadowRoot.querySelector("#cb-canvas-low-clean-canvas-button");
        this.colorPickerButton = this.shadowRoot.querySelector("#cb-canvas-low-color-picker-button");
        this.colorPickerInput = this.shadowRoot.querySelector("#cb-canvas-low-color-picker-input");
        this.colorPickerDefault = this.shadowRoot.querySelector("#cb-canvas-low-color-default-button");
    }

    connectedCallback() {
        console.log("Cubode Controls");

        this.zoomInButton.addEventListener('click', e=> { 
            // Emit event
            console.log("ZoomIn");
        })
        this.zoomOutButton.addEventListener('click', e=> { 
            // Emit event
            console.log("ZoomOut");
        })
        this.zoomFitButton.addEventListener('click', e=> { 
            // Emit event
            console.log("ZoomFit");
        })
        this.changeBackgroundButton.addEventListener('click', e=> { 
            // Emit event
            console.log("Background Change");
        })
        this.cleanCanvasButton.addEventListener('click', e=> { 
            // Emit event
            console.log("Clean Canvas Button");
        })
        this.colorPickerButton.addEventListener('click', e=> { 
            // Emit event
            console.log("Color Picker");
        })
        this.colorPickerInput.addEventListener('click', e=> { 
            // Emit event
            console.log("Color Input");
        })
        this.colorPickerDefault.addEventListener('click', e=> { 
            // Emit event
            console.log("Color Default");
        })
    }

    disconnectedCallback() {
        console.log("Cleanup");
        // TODO: REMOVE ALL THE EVENTLISTENERS.
    }
}

customElements.define('cb-canvas-controls', CanvasControls);
