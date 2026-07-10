import { render } from "../render.js";

const TYPE_COLOR = {
  default: "var(--geist-accent)",
  secondary: "var(--geist-secondary)",
  success: "var(--geist-success)",
  warning: "var(--geist-warning)",
  error: "var(--geist-error)",
};

export class GProgress extends HTMLElement {
  static get observedAttributes() {
    return ["value", "type"];
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

  get value() {
    if (!this.hasAttribute("value")) return null;
    const v = parseFloat(this.getAttribute("value"));
    if (isNaN(v)) return null;
    return Math.min(100, Math.max(0, v));
  }

  get type() {
    const t = this.getAttribute("type");
    return TYPE_COLOR[t] ? t : "default";
  }

  _render() {
    const value = this.value;
    const color = TYPE_COLOR[this.type];
    const indeterminate = value === null;

    const style = `
      :host {
        display: block;
        font-family: var(--geist-font);
      }
      .track {
        width: 100%;
        height: 4px;
        border-radius: var(--geist-radius);
        background: var(--geist-border);
        overflow: hidden;
      }
      .bar {
        height: 100%;
        background: ${color};
        border-radius: var(--geist-radius);
        transition: width .2s ease;
        width: ${indeterminate ? "40%" : value + "%"};
        ${indeterminate ? "animation: indeterminate 1.2s ease-in-out infinite;" : ""}
      }
      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(250%); }
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div class="track" role="progressbar" aria-valuenow={indeterminate ? undefined : value}>
          <div class="bar"></div>
        </div>
      </>
    );
  }
}

customElements.define("g-progress", GProgress);
