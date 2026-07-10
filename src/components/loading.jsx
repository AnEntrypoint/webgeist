import { render } from "../render.js";

const TYPE_COLOR = {
  default: "var(--geist-fg)",
  secondary: "var(--geist-secondary)",
  success: "var(--geist-success)",
  warning: "var(--geist-warning)",
  error: "var(--geist-error)",
};

export class GLoading extends HTMLElement {
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

  get type() {
    const t = this.getAttribute("type");
    return TYPE_COLOR[t] ? t : "default";
  }

  _render() {
    const color = TYPE_COLOR[this.type];

    const style = `
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--geist-gap-sm);
        font-family: var(--geist-font);
      }
      .dots {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${color};
        animation: pulse 1.4s ease-in-out infinite;
      }
      .dot:nth-child(2) { animation-delay: .2s; }
      .dot:nth-child(3) { animation-delay: .4s; }
      @keyframes pulse {
        0%, 80%, 100% { opacity: .25; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1); }
      }
      .label {
        color: var(--geist-fg);
        font-size: 14px;
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <span class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
        <span class="label">
          <slot></slot>
        </span>
      </>
    );
  }
}

customElements.define("g-loading", GLoading);
