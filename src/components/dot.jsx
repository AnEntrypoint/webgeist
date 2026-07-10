import { render } from "../render.js";

const TYPE_COLORS = {
  default: "var(--geist-fg)",
  success: "var(--geist-success)",
  warning: "var(--geist-warning)",
  error: "var(--geist-error)",
  secondary: "var(--geist-secondary)",
};

const STYLE = `
  :host { display: inline-block; }
  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
`;

export class GDot extends HTMLElement {
  static get observedAttributes() {
    return ["type"];
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
    const type = this.getAttribute("type") || "default";
    const color = TYPE_COLORS[type] || TYPE_COLORS.default;

    const vdom = (
      <span class="dot" style={`background: ${color};`}>
        <style>{STYLE}</style>
      </span>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-dot", GDot);
