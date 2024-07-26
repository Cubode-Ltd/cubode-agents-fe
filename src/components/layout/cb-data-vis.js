import { createGrid } from 'ag-grid-community';

const template = document.createElement('template');
template.innerHTML = `
    <div class="cb-data-visual cb-wc-height container mx-auto bg-white">
        <div id="data-table" class="ag-theme-alpine w-full h-full" style="width:100% !important;"></div>
    </div>
`;

class CBDataVis extends HTMLElement {
    constructor() {
        super();
        const templateContent = template.content.cloneNode(true);
        this.appendChild(templateContent);

        this.main = this.querySelector('.cb-data-visual')

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
        this.hidden = true;
    }

    show() {
        this.main.classList.remove('hidden');
        this.hidden = false;
    }

    static get observedAttributes() {
        return ['hidden'];
    }

    attributeChangedCallback(name) {

    }

    connectedCallback() {
        this.gridDiv = this.querySelector('#data-table');
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
