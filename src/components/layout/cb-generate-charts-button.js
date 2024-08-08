import dataNursery from '../../utils/DataNursery';

const template = document.createElement('template');
template.innerHTML = `
    <div class="data-source-button flex relative">
        <div class="absolute top-1/2 transform -translate-y-1/2 -left-14 w-[26px] h-[26px] flex-col justify-start items-start inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <g id="time-svgrepo-com 1">
                    <path id="Vector" d="M13.7973 13.785V13.8539L13.8617 13.8784L17.6825 15.331L17.6826 15.331C18.1902 15.5239 18.4453 16.0919 18.2523 16.5994L18.2523 16.5995C18.0594 17.1072 17.4914 17.3622 16.9838 17.1692L16.9838 17.1692L12.4646 15.4514C12.0829 15.3062 11.8306 14.9404 11.8306 14.5321V8.40389C11.8306 7.8608 12.2708 7.42055 12.8139 7.42055C13.357 7.42055 13.7973 7.8608 13.7973 8.40389V13.785ZM12.9998 4.23341C8.15814 4.23341 4.23317 8.15838 4.23317 13.0001C4.23317 17.8418 8.15814 21.7667 12.9998 21.7667C17.8416 21.7667 21.7665 17.8418 21.7665 13.0001C21.7665 8.15838 17.8416 4.23341 12.9998 4.23341ZM2.2665 13.0001C2.2665 7.07222 7.07198 2.26675 12.9998 2.26675C18.9276 2.26675 23.7332 7.07222 23.7332 13.0001C23.7332 18.9279 18.9276 23.7334 12.9998 23.7334C7.07198 23.7334 2.2665 18.9279 2.2665 13.0001Z" fill="#2D2D2A" fill-opacity="0.5" stroke="white" stroke-width="0.2"/>
                </g>
            </svg>
        </div>
        <button class="overflow-clip -ml-6 py-3 px-6 border rounded border-neutral-300 bg-[#2D2D2A] text-sm text-gray-100 flex">
            Generate
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="size-4 ml-2 w-4 h-4">
                <path fill-rule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clip-rule="evenodd"/>
            </svg>
        </button>
    </div>
`;

class CBDataSourceButton extends HTMLElement {
    constructor() {
        super();
        const templateContent = template.content.cloneNode(true);
        this.appendChild(templateContent);

        this.handleClick = this.handleClick.bind(this);
        this.updateSelectedData = this.updateSelectedData.bind(this);
        
        this.selectedHash = null;
        this.selectedFileName = null;
    }

    connectedCallback() {
        this.querySelector('button').addEventListener('click', this.handleClick);
        window.addEventListener('data-selected', this.updateSelectedData);
    }

    disconnectedCallback() {
        this.querySelector('button').removeEventListener('click', this.handleClick);
        window.removeEventListener('data-selected', this.updateSelectedData);
    }

    updateSelectedData(event) {
        const { hash, fileName } = event.detail;
        this.selectedHash = hash;
        this.selectedFileName = fileName;
    }

    async handleClick() {
        if (this.selectedHash && this.selectedFileName) {
            console.log(`Processing data: ${this.selectedFileName} (Hash: ${this.selectedHash})`);
            // Fetch metadata
            const metadata = await dataNursery.getMetadataByHash(this.selectedHash);
            this.dispatchEvent(new CustomEvent('inference-ai', {
                detail: { 
                    hash: this.selectedHash, 
                    fileName: this.selectedFileName,
                    metadata: metadata
                },
                bubbles: true,
                composed: true
            }));
            
            // Uncomment the following block if you want to send data to a backend

            
            fetch('http://localhost:8000/ai/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ hash: this.selectedHash, fileName: this.selectedFileName, metadata:metadata })
            })
            .then(response => {
                if (response.ok) {
                    console.log('Data successfully sent to backend');
                } else {
                    console.error('Failed to send data to backend');
                }
            })
            .catch(error => console.error('Error:', error));
            
        } else {
            console.log('No data source selected');
            this.showNoDataSelectedNotification();

        }
    }
    showNoDataSelectedNotification() {
        this.showCustomPopup("Please select a data source before processing.");
    }
    showCustomPopup(message) {
        const popup = document.createElement('div');
        popup.textContent = message;
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border: 1px solid black;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            z-index: 1000;
        `;
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.onclick = () => document.body.removeChild(popup);
        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    }

}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

customElements.define('cb-generate-charts-button', CBDataSourceButton);