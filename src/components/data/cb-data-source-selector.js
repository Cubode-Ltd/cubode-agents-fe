import dataNursery from './DataNursery';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "./css/main.css";
    </style>
    <div class="data-source-selector">
        <select id="data-source-selector" class="mb-3 p-2 rounded-2xl border border-neutral-300 w-full"></select>
    </div>
`;

class CBDataSourceSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);

        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.updateDropdown = this.updateDropdown.bind(this);
    }

    connectedCallback() {
        this.populateDropdown();
        this.shadowRoot.querySelector('#data-source-selector').addEventListener('change', this.handleFileSelection);
        window.addEventListener('fileStored', this.updateDropdown);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#data-source-selector').removeEventListener('change', this.handleFileSelection);
        window.removeEventListener('fileStored', this.updateDropdown);
    }

    async populateDropdown() {
        const selector = this.shadowRoot.querySelector('#data-source-selector');
        const nameToHashMapping = await dataNursery.name2hash.keys();

        selector.innerHTML = '<option value="">Select a data source</option>';
        nameToHashMapping.forEach(fileName => {
            const option = document.createElement('option');
            option.value = fileName;
            option.textContent = fileName;
            selector.appendChild(option);
        });
    }

    async updateDropdown(event) {
        const { fileName } = event.detail;
        const selector = this.shadowRoot.querySelector('#data-source-selector');
        const option = document.createElement('option');
        option.value = fileName;
        option.textContent = fileName;
        selector.appendChild(option);
    }

    async handleFileSelection(event) {
        const fileName = event.target.value;
        if (fileName) {
            const hash = await dataNursery.name2hash.getItem(fileName);
            const csvContent = await dataNursery.hashes2data.getItem(hash);
            const csvDataRows = await dataNursery.hashes2dataRows.getItem(hash);
            const columns = await dataNursery.hash2columns.getItem(hash);
            this.dispatchEvent(new CustomEvent('data-selected', {
                detail: { 
                    csvContent, 
                    csvDataRows, 
                    columns, 
                    hash, 
                    fileName 
                },
                bubbles: true,
                composed: true
            }));
        }
    }
}

customElements.define('cb-data-source-selector', CBDataSourceSelector);
