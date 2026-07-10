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

export class GTextarea extends HTMLElement {
  static get observedAttributes() {
    return ["label", "placeholder", "status", "value", "disabled", "resize"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._id = uid("g-textarea");
    this._value = "";
  }

  connectedCallback() {
    if (this.hasAttribute("value")) this._value = this.getAttribute("value");
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this.shadowRoot.addEventListener("input", this._onInput);
    this.shadowRoot.addEventListener("change", this._onChange);
    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("input", this._onInput);
    this.shadowRoot.removeEventListener("change", this._onChange);
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

  get disabled() {
    return this.hasAttribute("disabled");
  }

  get resize() {
    return this.getAttribute("resize") || "vertical";
  }

  _onInput(e) {
    const el = e.target.closest("textarea");
    if (!el) return;
    this._value = el.value;
    this.dispatchEvent(
      new CustomEvent("input", { detail: this._value, bubbles: true, composed: true })
    );
  }

  _onChange(e) {
    const el = e.target.closest("textarea");
    if (!el) return;
    this._value = el.value;
    this.dispatchEvent(
      new CustomEvent("change", { detail: this._value, bubbles: true, composed: true })
    );
  }

  _render() {
    const label = this.getAttribute("label");
    const placeholder = this.getAttribute("placeholder") || "";
    const status = this.status;
    const disabled = this.disabled;
    const resize = this.resize;

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
      textarea {
        display: block;
        width: 100%;
        min-height: 80px;
        padding: 8px 12px;
        border-radius: var(--geist-radius);
        border: 1px solid ${STATUS_COLOR[status]};
        background: var(--geist-bg);
        color: var(--geist-fg);
        font-size: 14px;
        font-family: inherit;
        resize: ${resize};
        opacity: ${disabled ? 0.5 : 1};
        outline: none;
        box-sizing: border-box;
      }
      textarea:focus {
        border-color: var(--geist-accent);
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        {label && <label for={this._id}>{label}</label>}
        <textarea
          id={this._id}
          placeholder={placeholder}
          disabled={disabled}
        >
          {this._value}
        </textarea>
      </>
    );
  }
}

customElements.define("g-textarea", GTextarea);
