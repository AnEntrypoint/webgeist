import { render } from "../render.js";

const SIZES = {
  small: 16,
  medium: 24,
  large: 32,
};

export class GSpinner extends HTMLElement {
  static get observedAttributes() {
    return ["size"];
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

  get size() {
    const attr = this.getAttribute("size");
    if (SIZES[attr]) return SIZES[attr];
    const n = parseFloat(attr);
    return isNaN(n) ? SIZES.medium : n;
  }

  _render() {
    const size = this.size;

    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font);
      }
      .spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid var(--geist-border);
        border-top-color: var(--geist-accent);
        animation: spin .7s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <span class="spinner" role="status" aria-label="loading"></span>
      </>
    );
  }
}

customElements.define("g-spinner", GSpinner);
