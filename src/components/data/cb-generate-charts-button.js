import dataNursery from './DataNursery';

const template = document.createElement('template');
template.innerHTML = `
    <style>@import "dev/css/main.css";</style>
    <div class="data-source-button">
        <button class="mb-3 p-2 rounded-2xl border border-neutral-300 w-full">Generate Charts</button>
    </div>
`;

class CBDataSourceButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);

        this.handleClick = this.handleClick.bind(this);
        this.updateSelectedData = this.updateSelectedData.bind(this);
        
        this.selectedHash = null;
        this.selectedFileName = null;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', this.handleClick);
        window.addEventListener('data-selected', this.updateSelectedData);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this.handleClick);
        window.removeEventListener('data-selected', this.updateSelectedData);
    }

    updateSelectedData(event) {
        const { hash, fileName } = event.detail;
        this.selectedHash = hash;
        this.selectedFileName = fileName;
    }

    handleClick() {
        if (this.selectedHash && this.selectedFileName) {
            console.log(`Processing data: ${this.selectedFileName} (Hash: ${this.selectedHash})`);
            
            this.dispatchEvent(new CustomEvent('inference-ai', {
                detail: { 
                    hash: this.selectedHash, 
                    fileName: this.selectedFileName 
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
                body: JSON.stringify({ hash: this.selectedHash, fileName: this.selectedFileName })
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