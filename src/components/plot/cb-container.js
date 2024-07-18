const template = document.createElement('template');
template.innerHTML = `
<style>
  @import "dev/css/main.css";
</style>

<div class="cb-maincontainer cb-fixed-top border p-5 container dark:bg-gray-700 mx-auto sm:w-full lg:w-1/2">
    <div class="flex justify-between w-full mb-4">
        <div class="whitespace-nowrap h-11 px-2 py-2.5 rounded-sm border border-gray-200 justify-center items-center gap-2.5 inline-flex">
            <button class="px-5 cursor-pointer rounded-sm justify-center items-center gap-2.5 flex">
                <div class="cb-plot-button-regenerate text-center text-zinc-800 text-[13px] font-normal font-['Poppins'] leading-[30px]">Regenerate</div>
            </button>
            <div class="w-1 h-[20px] origin-top-left border border-gray-200"></div>
            
            <button class="px-5 cursor-pointer rounded-sm justify-center items-center gap-2.5 flex">
                <div class="cb-plot-button-export text-center text-zinc-800 text-[13px] font-normal font-['Poppins'] leading-[30px]">Export</div>
            </button>
            <div class="w-1 h-[20px] origin-top-left border border-gray-200"></div>
            
            <button class="px-5 cursor-pointer rounded-sm justify-center items-center gap-2.5 flex">
                <div class="cb-plot-button-viewdata text-center text-zinc-800 text-[13px] font-normal font-['Poppins'] leading-[30px]">View Data</div>
            </button>    
        </div>
        
        <div class="space-x-2 hidden xl:flex">
            <img class="w-[102px] h-[58px]" src="https://via.placeholder.com/102x58" />
            <img class="w-[102px] h-[58px]" src="https://via.placeholder.com/102x58" />
            <img class="w-[102px] h-[58px]" src="https://via.placeholder.com/102x58" />
        </div>
    </div>

    <div class="bg-white shadow">
        <slot></slot>    
    </div>
</div>

`;

class Container extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.regenerate = this.shadowRoot.querySelector('.cb-plot-button-regenerate');
    this.export = this.shadowRoot.querySelector('.cb-plot-button-export');
    this.viewdata = this.shadowRoot.querySelector('.cb-plot-button-viewdata');

    this.slotElement = this.shadowRoot.querySelector('slot');
  }

  emitEvent(eventName) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event); 
  }

  toggleView() {
    const slotElements = this.slotElement.assignedNodes({ flatten: true }).filter(node => node.nodeType === Node.ELEMENT_NODE);
    slotElements.forEach(element => {
        if (element.tagName.toLowerCase() === 'cb-data-vis') {
          if (element.hidden) {
            element.show();            
          } else {
            element.hide();
          }
        } else if (element.classList.contains('cb-plot')) {
          if (element.hidden) {
            element.show();            
          } else {
            element.hide();
          }
        }
    });
    this.viewdata.textContent = this.viewdata.textContent === 'View Data' ? 'View Plot' : 'View Data';
  }

  connectedCallback() {
    this.regenerate.addEventListener('click', this.emitEvent.bind(this, 'regenerate'));
    this.export.addEventListener('click', this.emitEvent.bind(this, 'export'));
    this.viewdata.addEventListener('click', this.toggleView.bind(this));
  }

  disconnectedCallback() {
    this.regenerate.removeEventListener('click', this.emitEvent);
    this.export.removeEventListener('click', this.emitEvent);
    this.viewdata.removeEventListener('click', this.toggleView);
  }
}

customElements.define('cb-container', Container);
