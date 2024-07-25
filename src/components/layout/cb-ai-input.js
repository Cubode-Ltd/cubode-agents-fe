const template = document.createElement('template');
template.innerHTML = `
    <style>@import "dev/css/main.css";</style>

    <div class="cb-ai-input fixed bottom-14 w-3/4 left-1/2 transform -translate-x-1/2 min-w-[500px] bg-white shadow-lg rounded-2xl z-50">
        <label for="aiPromt" for="aiPromt" class="sr-only">ai prompt</label>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" class="absolute left-3 top-1/2 size-4 -translate-y-1/2 fill-blue-500 dark:fill-blue-400">
            <path fill-rule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clip-rule="evenodd" />
        </svg>

        <input id="aiPromt" type="text" class="w-full border-outline bg-white border rounded-2xl px-2 py-3 pl-10 pr-24 text-sm text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-75 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:focus-visible:outline-blue-400" name="prompt" placeholder="Ask Cubode AI ..." />
        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-blue-500 rounded-2xl px-2 py-1 text-xs tracking-wide text-white transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:opacity-100 active:outline-offset-0 dark:bg-blue-400 dark:text-black dark:focus-visible:outline-blue-400">Generate</button>

    </div>
`;

class AITextInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);

        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    static get observedAttributes() {
        return ['hidden'];
    }

    //attributeChangedCallback(name, oldValue, newValue) {
    attributeChangedCallback(name) {
            if (name === 'hidden') {
            this.toggleVisibility();
        }
    }

    toggleVisibility() {
        const container = this.shadowRoot.querySelector('.cb-ai-input');
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

    // Lifecicle Methods
    connectedCallback() {
        window.addEventListener('click', this.handleClickOutside);
    }

    disconnectedCallback() {
        window.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside(event) {
        const container = this.shadowRoot.querySelector('.cb-ai-input');
        if (!this.contains(event.target)) {
            const input = container.querySelector('input');
            if (input) {
                input.blur();
            }
        }
    }

    // Private Methods
    _keyPressed(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    // Public Methods
    summit() {
    }
}

customElements.define('cb-ai-input', AITextInput);
