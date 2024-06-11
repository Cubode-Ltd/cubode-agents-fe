const template = document.createElement('template');
template.innerHTML = `
    <style>@import "./css/main.css";</style>

    <div class="cb-data-upload my-3 mx-auto bg-white border px-2 pb-2 pt-3 rounded-2xl shadow-xl flex w-full max-w-sm flex-col gap-1">
        <label class="w-fit pl-0.5 mb-2 text-sm text-neutral-800 dark:text-neutral-300 font-bold" for="fileInput">Add your File</label>
        <input id="fileInput" type="file" class="w-full overflow-clip rounded-2xl border border-neutral-300 bg-neutral-200/50 text-sm text-neutral-800 file:mr-4 file:cursor-pointer file:border-none file:bg-neutral-200 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-75 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:file:bg-neutral-900 dark:file:text-neutral-100 dark:focus-visible:outline-blue-400" />

        <div class="icon-row flex justify-around mt-2">
            <div class="icon hover:bg-neutral-100 hover:border hover:shadow cursor-pointer w-12 h-12 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78">
                        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                        <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                    </svg>
            </div>
            
            <div class="icon hover:bg-neutral-100 hover:border-2 hover:shadow cursor-pointer w-12 h-12 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
                    <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#fff"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="#000"/>
                </svg>
            </div>

            <div class="icon hover:bg-neutral-100 hover:border-2 hover:shadow cursor-pointer w-12 h-12 p-2 rounded-full">            
                <svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2080 2080" style="enable-background:new 0 0 2080 2080;" xml:space="preserve">
                    <style type="text/css">
                        .st0{fill:#FFFFFF;}
                        .st1{fill:#217346;}
                        .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#217346;}
                    </style>
                    <metadata>
                        <sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/">
                            <slices/>
                            <sliceSourceBounds bottomLeftOrigin="true" height="2080" width="2080" x="-1016" y="-1016"/>
                        </sfw>
                    </metadata>
                    <g id="_48">
                        <rect x="1040" y="297.1" class="st0" width="941" height="1436.2"/>
                        <path class="st1" d="M1981,297.1v1436.2h-941V297.1H1981 M1981,198.1h-941c-54.7,0-99,44.3-99,99v1436.2c0,54.7,44.3,99,99,99h941   c54.7,0,99-44.3,99-99V297.1C2080,242.4,2035.7,198.1,1981,198.1z"/>
                        <rect x="1485.7" y="445.7" class="st1" width="346.7" height="148.6"/>
                        <rect x="1485.7" y="693.3" class="st1" width="346.7" height="148.6"/>
                        <rect x="1485.7" y="941" class="st1" width="346.7" height="148.6"/>
                        <rect x="1485.7" y="1188.6" class="st1" width="346.7" height="148.6"/>
                        <rect x="1485.7" y="1436.2" class="st1" width="346.7" height="148.6"/>
                        <rect x="1040" y="445.7" class="st1" width="346.7" height="148.6"/>
                        <rect x="1040" y="693.3" class="st1" width="346.7" height="148.6"/>
                        <rect x="1040" y="941" class="st1" width="346.7" height="148.6"/>
                        <rect x="1040" y="1188.6" class="st1" width="346.7" height="148.6"/>
                        <rect x="1040" y="1436.2" class="st1" width="346.7" height="148.6"/>
                        <path class="st2" d="M1238.1,0L0,216.9v1646.2L1238.1,2080V0z"/>
                        <path class="st0" d="M884.5,594.3l-172.8,10.4L606.2,852.3l-6.9,22.3l-5,16.8l-4.5,16.3l-3.5,13.4l0,0c0-6.6-1.5-12.9-4.5-18.8   l-4.5-17.3l-5-16.3l-5.4-14.9l-90.6-235.2L309.5,629l177.8,385.3l-196.6,385.3l162.9,9.9l109.4-252.6l5-17.3l4-15.4l3.5-12.9v-10.4   l0,0l3.5,18.3l3.5,15.4l3,11.9l3,8.4l113.9,269.4l189.2,11.9l-213-424.4L884.5,594.3"/>
                    </g>
                </svg>
            </div>
        </div>
    </div>
`;

class CBDataUpload extends HTMLElement {
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

    // attributeChangedCallback(name, oldValue, newValue) {
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

    // Lifecicle Methods
    connectedCallback() {
        window.addEventListener('click', this.handleClickOutside);
    }

    disconnectedCallback() {
        window.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (!this.contains(event.target)) {
            this.setAttribute('hidden', '')
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

customElements.define('cb-data-upload', CBDataUpload);
