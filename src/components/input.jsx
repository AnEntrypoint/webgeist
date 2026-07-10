import { render } from "../render.js";
import { uid } from "../utils/shared.js";

const STATUSES = ["default", "secondary", "success", "warning", "error"];

const STATUS_COLOR = {
  default: "var(--geist-border)",
  secondary: "var(--geist-secondary)",
  success: "var(--geist-success)",
  warning: "var(--geist-warning)",
  error: "var(--geist-error)",
};

export class GInput extends HTMLElement {
  static get observedAttributes() {
    return ["label", "placeholder", "clearable", "status", "value", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._id = uid("g-input");
    this._value = "";
  }

  connectedCallback() {
    if (this.hasAttribute("value")) this._value = this.getAttribute("value");
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onClear = this._onClear.bind(this);
    this.shadowRoot.addEventListener("input", this._onInput);
    this.shadowRoot.addEventListener("change", this._onChange);
    this.shadowRoot.addEventListener("click", this._onClear);
    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("input", this._onInput);
    this.shadowRoot.removeEventListener("change", this._onChange);
    this.shadowRoot.removeEventListener("click", this._onClear);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "value" && newVal !== this._value) {
      this._value = newVal || "";
    }
    this._render();
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
    this.setAttribute("value", v);
  }

  get status() {
    const s = this.getAttribute("status");
    return STATUSES.includes(s) ? s : "default";
  }

  get clearable() {
    return this.hasAttribute("clearable");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  _onInput(e) {
    const inputEl = e.target.closest("input");
    if (!inputEl) return;
    this._value = inputEl.value;
    this._render();
    this.dispatchEvent(
      new CustomEvent("input", { detail: this._value, bubbles: true, composed: true })
    );
  }

  _onChange(e) {
    const inputEl = e.target.closest("input");
    if (!inputEl) return;
    this._value = inputEl.value;
    this.dispatchEvent(
      new CustomEvent("change", { detail: this._value, bubbles: true, composed: true })
    );
  }

  _onClear(e) {
    const clearBtn = e.target.closest(".clear");
    if (!clearBtn) return;
    this._value = "";
    this._render();
    this.dispatchEvent(
      new CustomEvent("input", { detail: "", bubbles: true, composed: true })
    );
    this.dispatchEvent(
      new CustomEvent("change", { detail: "", bubbles: true, composed: true })
    );
  }

  _render() {
    const label = this.getAttribute("label");
    const placeholder = this.getAttribute("placeholder") || "";
    const status = this.status;
    const disabled = this.disabled;
    const clearable = this.clearable && this._value;

    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font);
      }
      label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        color: var(--geist-fg);
      }
      .wrap {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 38px;
        padding: 0 12px;
        border-radius: var(--geist-radius);
        border: 1px solid ${STATUS_COLOR[status]};
        background: var(--geist-bg);
        opacity: ${disabled ? 0.5 : 1};
      }
      .wrap:focus-within {
        border-color: var(--geist-accent);
      }
      input {
        border: none;
        outline: none;
        background: transparent;
        color: var(--geist-fg);
        font-size: 14px;
        font-family: inherit;
        flex: 1;
        min-width: 0;
      }
      ::slotted([slot="icon"]) {
        display: inline-flex;
      }
      .clear {
        border: none;
        background: transparent;
        color: var(--geist-secondary);
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
        padding: 0;
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        {label && <label for={this._id}>{label}</label>}
        <div class="wrap">
          <slot name="icon"></slot>
          <input
            id={this._id}
            type="text"
            placeholder={placeholder}
            value={this._value}
            disabled={disabled}
          />
          {clearable && (
            <button type="button" class="clear" aria-label="Clear">
              &times;
            </button>
          )}
        </div>
      </>
    );
  }
}

customElements.define("g-input", GInput);
