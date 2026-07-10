class GeistProvider extends HTMLElement {
  static get observedAttributes() {
    return ["theme"];
  }

  connectedCallback() {
    this._applyTheme();
  }

  attributeChangedCallback() {
    this._applyTheme();
  }

  _applyTheme() {
    const theme = this.getAttribute("theme") || "light";
    const root = document.documentElement;
    if (root) {
      root.setAttribute("data-theme", theme);
    }
  }
}

customElements.define("g-provider", GeistProvider);
