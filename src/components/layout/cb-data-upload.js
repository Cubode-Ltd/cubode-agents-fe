import dataNursery from '../../utils/DataNursery';

const template = document.createElement('template');
template.innerHTML = `
    <div class="cb-data-upload container mx-auto py-3 flex flex-nowrap items-center no-select">
        <cb-data-source-selector class="-mr-[200px] z-10"></cb-data-source-selector>
        <label for="fileInput" class="upload-label cursor-pointer rounded-l-sm
                overflow-clip w-[34rem] py-3 pl-56 border border-neutral-300 bg-white text-sm text-neutral-800 
                file:mr-4 file:cursor-pointer file:border-none file:bg-white file:px-4 file:py-2 file:font-medium file:text-black 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                disabled:cursor-not-allowed disabled:opacity-75 
                dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:file:bg-neutral-900 dark:file:text-neutral-100">
            Upload your file
            <input id="fileInput" type="file" class="hidden"/>
        </label>
        <cb-generate-charts-button></cb-generate-charts-button>
    </div>
`;

class CBDataUpload extends HTMLElement {
    constructor() {
        super();
        const templateContent = template.content.cloneNode(true);
        this.appendChild(templateContent);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    static get observedAttributes() {
        return ['hidden'];
    }

    attributeChangedCallback(name) {
        if (name === 'hidden') {
            this.toggleVisibility();
        }
    }

    toggleVisibility() {
        const container = this.querySelector('.cb-data-upload');
        if (this.hasAttribute('hidden')) {
            container.setAttribute('hidden', '');
        } else {
            container.removeAttribute('hidden');
        }
    }

    get hidden() {
        return this.hasAttribute('hidden');
    }

    set hidden(value) {
        if (value) {
            this.setAttribute('hidden', '');
        } else {
            this.removeAttribute('hidden');
        }
    }

    connectedCallback() {
        window.addEventListener('click', this.handleClickOutside);
        this.querySelector('#fileInput').addEventListener('change', this.handleFileUpload);
    }

    disconnectedCallback() {
        window.removeEventListener('click', this.handleClickOutside);
        this.querySelector('#fileInput').removeEventListener('change', this.handleFileUpload);
    }


    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            await dataNursery.storeCsvFile(file);
        }
    }
}

customElements.define('cb-data-upload', CBDataUpload);