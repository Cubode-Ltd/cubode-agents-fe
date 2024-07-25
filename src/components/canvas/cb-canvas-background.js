const template = document.createElement('template');
template.innerHTML = `
    <style>@import "css/index.css";</style>

    <svg style="z-index:0;" class="fill-white dark:fill-gray-800 overflow-visible" x="0" y="0" width="100%" height="100%">    
        <defs>
            <pattern id="cb-pattern-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="7" cy="7" r="1" class="fill-[#c9c9c9] dark:fill-[#c9c9c963]"></circle>
            </pattern>
            <pattern id="cb-pattern-grid" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(0)">
                <line x1="0" y1="0" x2="0" y2="20" class="stroke-[#33333321] dark:stroke-[#333333ea]" style="stroke-width:1"></line>
                <line x1="0" y1="0" x2="20" y2="0" class="stroke-[#33333321] dark:stroke-[#333333ea]" style="stroke-width:1"></line>
            </pattern>
            <pattern id="cb-pattern-checker" patternUnits="userSpaceOnUse" width="200" height="200">
                <rect width="100" height="100" x="0" y="0" class="fill-[#cfcfcf15] dark:fill-[#cfcfcf0b]"></rect>
                <rect width="100" height="100" x="100" y="100" class="fill-[#cfcfcf15] dark:fill-[#cfcfcf0b]"></rect>
            </pattern>
        </defs>
        <rect x="-5000%" y="-5000%" width="10000%" height="10000%" fill="url(#cb-pattern-dots)" class="cubode-pattern-ph pointer-events-none"></rect>
    </svg>
`;

class CanvasBackground extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.backgroundRect = this.shadowRoot.querySelector('.cubode-pattern-ph');
    }

    connectedCallback() {
        console.log("Cubode Background");
    }

    disconnectedCallback() {
        console.log("Cleanup");
    }

    /**
     * Sets the background pattern of the `<cb-canvas-background>` element.
     * This method modifies the `fill` attribute of an SVG rectangle to use a predefined pattern.
     * The method checks if the provided pattern name is valid and updates the rectangle accordingly.
     *
     * @param {string} patternName - The name of the pattern to set. Must be one of 'dots', 'grid', or 'checker'.
     *                               If the pattern name is valid, the fill attribute of the background rectangle
     *                               is set to the corresponding URL of the SVG pattern.
     *
     * Usage:
     *   - Call this method with a string argument corresponding to the desired pattern.
     *   - Valid pattern names: "dots", "grid", "checker".
     *
     * Example:
     *   let myCanvasBackground = new CanvasBackground();
     *   myCanvasBackground.pattern = 'dots';  // Sets the background to the 'dots' pattern
     *
     * Behavior:
     *   - If the `patternName` is valid (i.e., one of 'dots', 'grid', 'checker'), the method updates
     *     the SVG's `fill` attribute to `url(#cb-pattern-patternName)`, effectively changing the pattern.
     *   - If an invalid pattern name is passed, it logs an error message to the console.
     *
     * Errors:
     *   - Logs an error to the console if the pattern name is not one of the specified valid options.
     */
    set pattern(patternName) {
        if (['dots', 'grid', 'checker'].includes(patternName)) {
            this.backgroundRect.setAttribute('fill', `url(#cb-pattern-${patternName})`);
        } else {
            console.error('Invalid pattern name:', patternName);
        }
    }

    
}

customElements.define('cb-canvas-background', CanvasBackground);