import dataNursery from '../../utils/DataNursery';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "dev/css/main.css";
    </style>
    <div class="data-source-selector relative flex items-center">
        <div class="absolute w-6 h-6 top-[7px] left-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
                <path id="Vector" d="M11.0625 0.444092V5.54607H16.1645L11.0625 0.444092Z" fill="#2D2D2A"/>
                <path id="Vector_2" d="M10.1003 7.49083C9.55667 7.49083 9.13848 7.05173 9.13848 6.52898V0.0678711H0.983678C0.502754 0.0678711 0.105469 0.465156 0.105469 0.94608V19.0539C0.105469 19.5348 0.502754 19.9321 0.983678 19.9321H15.6832C16.1642 19.9321 16.5614 19.5348 16.5614 19.0539V7.49083H10.1003ZM12.9859 16.5448C12.9859 16.6911 12.8604 16.8166 12.714 16.8166H3.91104C3.76467 16.8166 3.63922 16.6911 3.63922 16.5448V15.1229C3.63922 14.9765 3.76467 14.8511 3.91104 14.8511H12.735C12.8813 14.8511 13.0068 14.9765 13.0068 15.1229V16.5448H12.9859ZM12.9859 12.2164C12.9859 12.3628 12.8604 12.4883 12.714 12.4883H3.91104C3.76467 12.4883 3.63922 12.3628 3.63922 12.2164V10.7946C3.63922 10.6482 3.76467 10.5227 3.91104 10.5227H12.735C12.8813 10.5227 13.0068 10.6482 13.0068 10.7946V12.2164H12.9859Z" fill="#2D2D2A"/>
            </svg>
        </div>
        <select id="data-source-selector" class="w-48 py-2 px-3 text-sm rounded-sm pl-8"></select>
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

        selector.innerHTML = '<option value="">Choose File</option>';
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

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

customElements.define('cb-data-source-selector', CBDataSourceSelector);
