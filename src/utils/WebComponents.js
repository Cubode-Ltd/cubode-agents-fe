let globalSheets = null;

export function addGlobalStyles(shadowRoot) {
    if (globalSheets === null) {
        globalSheets = Array.from(document.styleSheets).map(sheet => {
            const newSheet = new CSSStyleSheet();
            const css = Array.from(sheet.cssRules).map(rule => rule.cssText).join(' ');
            newSheet.replaceSync(css);
            return newSheet;
        });
    }
    shadowRoot.adoptedStyleSheets.push(...globalSheets);
}