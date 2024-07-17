import { createGrid } from 'ag-grid-community';

const template = document.createElement('template');
template.innerHTML = `
    <style>@import "dev/css/main.css";</style>

    <div class="cb-data-visual container mx-auto py-4 px-4 bg-white pb-3 pt-3 shadow-lg">
        <div id="data-table" class="ag-theme-alpine w-full h-[400px]" style="width:100% !important;"></div>
    </div>
`;

class CBDataVis extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);

        this.main = this.shadowRoot.querySelector('.cb-data-visual')

        this.gridOptions = {
            pagination: true,
            columnDefs: [],
            rowData: [],
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true
            },
            rowDragManaged: true,
            animateRows: true,
            rowSelection: 'multiple',
            onGridReady: this.onGridReady.bind(this)
        };

        this.handleDataSelected = this.handleDataSelected.bind(this);
    }

    hide() {
        this.main.classList.add('hidden');
    }

    show() {
        this.main.classList.remove('hidden');
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
        this.gridDiv = this.shadowRoot.querySelector('#data-table');
        createGrid(this.gridDiv, this.gridOptions);
        window.addEventListener('data-selected', this.handleDataSelected);
    }

    disconnectedCallback() {
        window.removeEventListener('data-selected', this.handleDataSelected);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    handleDataSelected(event) {
        const { csvDataRows, columns } = event.detail;
        this.loadDataTable(csvDataRows, columns);
    }

    loadDataTable(csvDataRows, columns) {
        const tableHeaders = columns;
        const tableData = csvDataRows;

        const columnDefs = [
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                rowDrag: true,
                width: 50,
                headerName: '',
                resizable: false,
                //pinned: 'left',
                lockPosition: true
            },
            ...tableHeaders.map(header => ({ headerName: header, field: header }))
        ];

        this.gridApi.setColumnDefs(columnDefs);
        this.gridApi.setRowData(tableData);
    }
}

customElements.define('cb-data-vis', CBDataVis);
