import { createGrid } from 'ag-grid-community';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "dev/css/main.css";
        .cb-data-visual {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        #data-table {
            height: 400px;
            width: 100%;
        }

        .ag-theme-alpine {
            --ag-header-background-color: #f8f9fa;
            --ag-row-hover-color: #f1f3f5;
            --ag-alpine-active-color: #007bff;
            --ag-background-color: #ffffff;
            --ag-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            --ag-border-color: #dee2e6;
            --ag-odd-row-background-color: #f8f9fa;
            --ag-header-foreground-color: #212529;
            --ag-foreground-color: #495057;
            --ag-secondary-foreground-color: #6c757d;
            --ag-font-size: 14px;
            --ag-icon-size: 16px;
            --ag-border-radius: 1rem;
        }

        .search-container {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;
        }

        .search-container input {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            width: 300px;
        }
    </style>

    <div class="cb-data-visual container mx-auto py-4 px-4 sm:w-full lg:w-1/2 bg-white border pb-2 pt-3 rounded-2xl shadow-lg my-3">
        <div id="data-table" class="ag-theme-alpine"></div>
    </div>
`;

class CBDataVis extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);

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
