import { definedProps } from "../utils/shared.js";

const STYLE = `
:host {
  display: block;
}
:host([inline]) {
  display: inline-block;
}
.spacer {
  width: var(--g-spacer-width, 1em);
  height: var(--g-spacer-height, 1em);
}
`;

class GeistSpacer extends HTMLElement {
  static get observedAttributes() {
    return ["width", "height", "inline"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const width = this.getAttribute("width") || "1";
    const height = this.getAttribute("height") || width;

    const toSize = (v) => (/^[\d.]+$/.test(v) ? `${parseFloat(v)}em` : v);

    this.style.setProperty("--g-spacer-width", toSize(width));
    this.style.setProperty("--g-spacer-height", toSize(height));

    const vdom = (
      <>
        <style>{STYLE}</style>
        <div class="spacer" {...definedProps({})}></div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-spacer", GeistSpacer);
