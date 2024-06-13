const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "./css/main.css";
        .gear-icon {
            position: absolute;
            top: 10px;
            left: 10px;
            cursor: pointer;
            width: 24px;
            height: 24px;
        }

        .menu.visible {
            display: block;
        }

        .menu.hidden {
            display: none;
        }

        .container {
            position: relative;
            width: 100%;
            height: 400px;
            overflow: visible; /* Ensure overflow is visible */
        }

        .cb-plot {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .absolute {
            position: absolute;
        }

        .z-10 {
            z-index: 10; /* Ensure the menu is on top */
        }

        .scrollable {
            max-height: 200px; /* Adjust as needed */
            overflow-y: auto;
        }
    </style>
    <div class="container mx-auto px-4 sm:w-full lg:w-1/2">
        <slot></slot>
        <div class="absolute top-0 left-0 fill-gray-700 hover:fill-gray-900 drop-shadow-md ml-2 mt-2 cursor-pointer">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="gearIcon" viewBox="0 0 45.973 45.973" xml:space="preserve">
                <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774    c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815    C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607    c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205    C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501    C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763    c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733    s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128    c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735    c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77    c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z     M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85    C30.906,27.334,27.355,30.85,22.976,30.85z"/>
            </svg>
        </div>
        
        <div id="menu" class="menu hidden absolute top-10 left-2 bg-white border rounded border-gray-300 p-2 z-10 scrollable">
            <ul id="color-list" class="p-2"></ul>
        </div>
    </div>
`;

class PlotContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Reference to the gear icon and menu
        this.gearIcon = this.shadowRoot.getElementById('gearIcon');
        this.menu = this.shadowRoot.getElementById('menu');
        this.colorList = this.shadowRoot.getElementById('color-list');

        // Bind event listener
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    connectedCallback() {
        this.gearIcon.addEventListener('click', this.toggleMenu);
        document.addEventListener('click', this.handleClickOutside);

        // Listen for slot content changes
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
            this.updateColorList();
        });
        this.updateColorList(); // Initial population of the color list
    }

    disconnectedCallback() {
        this.gearIcon.removeEventListener('click', this.toggleMenu);
        document.removeEventListener('click', this.handleClickOutside);
    }

    toggleMenu(event) {
        event.stopPropagation();
        this.menu.classList.toggle('hidden');
    }

    handleClickOutside(event) {
        if (!this.contains(event.target)) {
            this.menu.classList.add('hidden');
        }
    }

    contains(target) {
        return this.shadowRoot.contains(target) || this === target;
    }

    updateColorList() {
        // Clear the existing color list
        this.colorList.innerHTML = '';
    
        // Get the cb-echart plot elements from the slot
        const slot = this.shadowRoot.querySelector('slot');
        const assignedElements = slot.assignedElements();
        // ADD TO THIS LIST THE SPECIFIED CB ECHART PLOT 
        const plotTypes = ['cb-echart-barplot', 'cb-echart-scatterplot', 'cb-echart-pieplot', 'cb-echart-lineplot'];
    
        plotTypes.forEach(plotType => {
            const plotElement = assignedElements.find(el => el.tagName.toLowerCase() === plotType);
    
            if (plotElement) {
                // Extract color scales from the plot component
                const colorScales = plotElement.getColorScales();
    
                // Render color scales as list items
                for (const [scaleName, scaleFunction] of Object.entries(colorScales)) {
                    const li = document.createElement('li');
                    li.textContent = scaleName;
                    li.addEventListener('click', () => {
                        plotElement.setAttribute('colorscale', scaleName);
                    });
                    this.colorList.appendChild(li);
                }
            }
        });
    }
}

customElements.define('cb-plot-container', PlotContainer);