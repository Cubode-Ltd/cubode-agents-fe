// Or do not use shadowRoot or if use (because of slot), use the addGlobalStyles to point to the styles.
import { addGlobalStyles } from '../../utils/WebComponents'

const template = document.createElement('template');
template.innerHTML = `
  <div class="cb-maincontainer cb-fixed-top p-5 container mx-auto sm:w-full lg:w-1/2 no-select">
    <div class="flex justify-between w-full mb-4">
        <div class="whitespace-nowrap h-11 px-2 py-2.5 rounded-sm border border-gray-200 justify-center items-center gap-2.5 inline-flex">
            <button class="px-5 cursor-pointer rounded-sm justify-center items-center gap-2.5 flex font-normal hover:font-medium">
                <div class="cb-plot-button-regenerate text-center text-zinc-800 text-[13px] font-['Poppins'] leading-[30px]">Regenerate</div>
            </button>
            <div class="w-1 h-[20px] origin-top-left border-l border-gray-200"></div>

            <button class="px-5 cursor-pointer rounded-sm justify-center items-center gap-2.5 flex font-normal hover:font-medium">
                <div class="cb-plot-button-export text-center text-zinc-800 text-[13px] font-['Poppins'] leading-[30px]">Export</div>
            </button>
            <div class="w-1 h-[20px] origin-top-left  border-l border-gray-200"></div>
            
            <button class="px-5 cursor-pointer rounded-sm justify-center items-center gap-2.5 flex font-normal hover:font-medium">
                <div class="cb-plot-button-viewdata text-center text-zinc-800 text-[13px] font-['Poppins'] leading-[30px]">View Data</div>
            </button>    
        </div>
        
        <div class="hidden space-x-2">
            <img class="w-[102px] h-[58px]" src="https://via.placeholder.com/102x58" />
            <img class="w-[102px] h-[58px]" src="https://via.placeholder.com/102x58" />
            <img class="w-[102px] h-[58px]" src="https://via.placeholder.com/102x58" />
        </div>
    </div>

    <div class="bg-white shadow carousel-container">
        <div class="carousel-wrapper">
            <div class="carousel-inner">
                <slot></slot>
            </div>
        </div>
       <button class="carousel-control prev bg-gray-200 opacity-60 text-white text-xs py-1 px-2 rounded-full absolute left-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-700 hover:shadow-lg transition-all">&#10094;</button>
        <button class="carousel-control next bg-gray-200 opacity-60 text-white text-xs py-1 px-2 rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-700 hover:shadow-lg transition-all">&#10095;</button>
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
    addGlobalStyles(this.shadowRoot);

    this.regenerate = this.shadowRoot.querySelector('.cb-plot-button-regenerate');
    this.export = this.shadowRoot.querySelector('.cb-plot-button-export');
    this.viewdata = this.shadowRoot.querySelector('.cb-plot-button-viewdata');

    this.prevButton = this.shadowRoot.querySelector('.carousel-control.prev');
    this.nextButton = this.shadowRoot.querySelector('.carousel-control.next');
    this.slotElement = this.shadowRoot.querySelector('slot');
    this.currentIndex = 0;
    this.isDataView = false;
  }

  emitEvent(eventName) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  toggleView() {
    const slotElements = this.slotElement.assignedElements({ flatten: true });
    const dataViewElement = slotElements.find(element => element.tagName.toLowerCase() === 'cb-data-vis');
    if (this.isDataView) {
      this.isDataView = false;
      this.viewdata.textContent = 'View Data';
      this.prevButton.classList.remove('hidden');
      this.nextButton.classList.remove('hidden');
      this.showSlide(this.currentIndex); // Show the previously active plot
    } else {
      this.isDataView = true;
      this.viewdata.textContent = 'View Plot';
      this.prevButton.classList.add('hidden');
      this.nextButton.classList.add('hidden');
      slotElements.forEach(el => el.classList.remove('active'));
      if (dataViewElement) {
        dataViewElement.classList.add('active');
      }
    }
  }

  showSlide(index) {
    if (this.isDataView) return; // Do nothing if currently in data view

    const slotElements = this.slotElement.assignedElements({ flatten: true });
    const totalSlides = slotElements.length;
    if (index >= totalSlides) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = totalSlides - 1;
    } else {
      this.currentIndex = index;
    }
    
    slotElements.forEach((el, idx) => {
      if (idx === this.currentIndex) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  handleExport() {
    const slotElements = this.slotElement.assignedElements({ flatten: true });
    const activeElement = slotElements[this.currentIndex];
    if (activeElement && typeof activeElement.exportPNG === 'function') {
      activeElement.exportPNG();
    }
  }
  

  connectedCallback() {
    this.regenerate.addEventListener('click', this.emitEvent.bind(this, 'regenerate'));
    // this.export.addEventListener('click', this.emitEvent.bind(this, 'export'));
    this.export.addEventListener('click', this.handleExport.bind(this));
    this.viewdata.addEventListener('click', this.toggleView.bind(this));
    this.shadowRoot.querySelector('.carousel-control.next').addEventListener('click', this.nextSlide.bind(this));
    this.shadowRoot.querySelector('.carousel-control.prev').addEventListener('click', this.prevSlide.bind(this));
    
    // Show the first slide initially
    this.showSlide(this.currentIndex);
  }

  disconnectedCallback() {
    this.regenerate.removeEventListener('click', this.emitEvent);
    // this.export.removeEventListener('click', this.emitEvent);
    this.export.removeEventListener('click', this.handleExport);
    this.viewdata.removeEventListener('click', this.toggleView);
    this.shadowRoot.querySelector('.carousel-control.next').removeEventListener('click', this.nextSlide);
    this.shadowRoot.querySelector('.carousel-control.prev').removeEventListener('click', this.prevSlide);
  }
}

customElements.define('cb-container', Container);