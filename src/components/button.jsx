import { render } from "../render.js";

const TYPES = ["default", "secondary", "success", "warning", "error"];
const SIZES = ["mini", "small", "medium", "large"];

const SIZE_PADDING = {
  mini: "0 8px",
  small: "0 15px",
  medium: "0 20px",
  large: "0 25px",
};

const SIZE_HEIGHT = {
  mini: "22px",
  small: "30px",
  medium: "38px",
  large: "46px",
};

const TYPE_COLOR = {
  default: "var(--geist-fg)",
  secondary: "var(--geist-secondary)",
  success: "var(--geist-success)",
  warning: "var(--geist-warning)",
  error: "var(--geist-error)",
};

export class GButton extends HTMLElement {
  static get observedAttributes() {
    return ["type", "size", "ghost", "loading", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._onClick = this._onClick.bind(this);
    this.shadowRoot.addEventListener("click", this._onClick);
    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this._onClick);
  }

  attributeChangedCallback() {
    this._render();
  }

  get type() {
    const t = this.getAttribute("type");
    return TYPES.includes(t) ? t : "default";
  }

  get size() {
    const s = this.getAttribute("size");
    return SIZES.includes(s) ? s : "medium";
  }

  get ghost() {
    return this.hasAttribute("ghost");
  }

  get loading() {
    return this.hasAttribute("loading");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  _onClick(e) {
    if (this.disabled || this.loading) {
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("click", { bubbles: true, composed: true }));
  }

  _render() {
    const type = this.type;
    const color = TYPE_COLOR[type];
    const ghost = this.ghost;
    const loading = this.loading;
    const disabled = this.disabled;

    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font);
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: ${SIZE_HEIGHT[this.size]};
        padding: ${SIZE_PADDING[this.size]};
        border-radius: var(--geist-radius);
        border: 1px solid ${ghost ? color : "var(--geist-border)"};
        background: ${ghost ? "transparent" : color};
        color: ${ghost ? color : "var(--geist-bg)"};
        font-size: 14px;
        font-family: inherit;
        cursor: pointer;
        transition: opacity .2s ease, transform .1s ease;
        opacity: ${disabled ? 0.4 : 1};
        pointer-events: ${disabled || loading ? "none" : "auto"};
      }
      button:active {
        transform: scale(0.98);
      }
      .spinner {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-right-color: transparent;
        animation: spin .6s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <button disabled={disabled} aria-busy={loading ? "true" : "false"}>
          {loading && <span class="spinner"></span>}
          <slot></slot>
        </button>
      </>
    );
  }
}

customElements.define("g-button", GButton);
