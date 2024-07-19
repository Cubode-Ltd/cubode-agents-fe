const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import "dev/css/main.css";
    
    .carousel-container {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .carousel-wrapper {
        display: flex;
        transition: transform 0.5s ease-in-out;
    }

    .carousel-inner ::slotted(*) {
        min-width: 100%;
        box-sizing: border-box;
    }

    .carousel-control {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px;
    }

    .carousel-control.prev {
        left: 10px;
    }

    .carousel-control.next {
        right: 10px;
    }
  </style>

  <div class="cb-maincontainer cb-fixed-top p-5 container dark:bg-gray-700 mx-auto sm:w-full lg:w-1/2 no-select">
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

      <div class="bg-white shadow carousel-container">
          <div class="carousel-wrapper">
              <div class="carousel-inner">
                  <slot></slot>
              </div>
          </div>
          <button class="carousel-control prev" onclick="prevSlide()">&#10094;</button>
          <button class="carousel-control next" onclick="nextSlide()">&#10095;</button>
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
    this.carouselWrapper = this.shadowRoot.querySelector('.carousel-wrapper');
    this.currentIndex = 0;
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
      if (element.tagName.toLowerCase() === 'cb-data-vis' || element.tagName.toLowerCase().startsWith('cb-echart')) {
        element.hidden = !element.hidden;
      }
    });
    this.viewdata.textContent = this.viewdata.textContent === 'View Data' ? 'View Plot' : 'View Data';
  }

  showSlide(index) {
    const totalSlides = this.carouselWrapper.children.length;
    if (index >= totalSlides) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = totalSlides - 1;
    } else {
      this.currentIndex = index;
    }
    this.carouselWrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  connectedCallback() {
    this.regenerate.addEventListener('click', this.emitEvent.bind(this, 'regenerate'));
    this.export.addEventListener('click', this.emitEvent.bind(this, 'export'));
    this.viewdata.addEventListener('click', this.toggleView.bind(this));
    this.shadowRoot.querySelector('.carousel-control.next').addEventListener('click', this.nextSlide.bind(this));
    this.shadowRoot.querySelector('.carousel-control.prev').addEventListener('click', this.prevSlide.bind(this));
  }

  disconnectedCallback() {
    this.regenerate.removeEventListener('click', this.emitEvent);
    this.export.removeEventListener('click', this.emitEvent);
    this.viewdata.removeEventListener('click', this.toggleView);
    this.shadowRoot.querySelector('.carousel-control.next').removeEventListener('click', this.nextSlide);
    this.shadowRoot.querySelector('.carousel-control.prev').removeEventListener('click', this.prevSlide);
  }
}

customElements.define('cb-container', Container);
