import dataNursery from '../data/DataNursery';
// import 'datatables.net-dt/css/jquery.dataTables.css';
// import $ from 'jquery';
// import 'datatables.net';

const template = document.createElement('template');
template.innerHTML = `
    <style>@import "./css/main.css";</style>

    <div class="cb-data-upload container mx-auto px-4 sm:w-full lg:w-1/2 bg-white border pb-2 pt-3 rounded-2xl shadow-lg flex-col gap-1 my-3">
        <select id="data-source-selector" class="mb-3"></select>
        <table id="data-table" class="display" width="100%"></table>
    </div>
`;

class CBDataVis extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);

        this.handleFileSelection = this.handleFileSelection.bind(this);
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
        const container = this.shadowRoot.querySelector('.cb-data-upload');
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
        this.populateDropdown();
        this.shadowRoot.querySelector('#data-source-selector').addEventListener('change', this.handleFileSelection);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#data-source-selector').removeEventListener('change', this.handleFileSelection);
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

    async handleFileSelection(event) {
        const fileName = event.target.value;
        if (fileName) {
            const hash = await dataNursery.name2hash.getItem(fileName);
            const csvContent = await dataNursery.hashes2data.getItem(hash);
            this.loadDataTable(csvContent);
        }
    }

    loadDataTable(csvContent) {
        const data = $.csv.toArrays(csvContent);
        const tableHeaders = data[0];
        const tableData = data.slice(1);

        const dataTable = $(this.shadowRoot.querySelector('#data-table')).DataTable({
            destroy: true,  // Destroy any existing table data
            data: tableData,
            columns: tableHeaders.map(header => ({ title: header }))
        });
    }
}

customElements.define('cb-data-vis', CBDataVis);