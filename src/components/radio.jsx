import { render } from "../render.js";

export class GRadio extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled", "value"];
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

  get checked() {
    return this.hasAttribute("checked");
  }

  set checked(val) {
    if (val) this.setAttribute("checked", "");
    else this.removeAttribute("checked");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  _onClick() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent("g-radio-select", {
        detail: this.value,
        bubbles: true,
        composed: true,
      })
    );
  }

  _render() {
    const checked = this.checked;
    const disabled = this.disabled;

    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font);
      }
      .row {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        opacity: ${disabled ? 0.5 : 1};
        pointer-events: ${disabled ? "none" : "auto"};
      }
      .dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid ${checked ? "var(--geist-accent)" : "var(--geist-border)"};
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .dot::after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--geist-accent);
        display: ${checked ? "block" : "none"};
      }
      .label {
        font-size: 14px;
        color: var(--geist-fg);
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div
          class="row"
          role="radio"
          aria-checked={checked ? "true" : "false"}
          aria-disabled={disabled ? "true" : "false"}
        >
          <span class="dot"></span>
          <span class="label">
            <slot></slot>
          </span>
        </div>
      </>
    );
  }
}

customElements.define("g-radio", GRadio);

export class GRadioGroup extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._onSelect = this._onSelect.bind(this);
    this.addEventListener("g-radio-select", this._onSelect);
    this._render();
    this._syncChildren();
  }

  disconnectedCallback() {
    this.removeEventListener("g-radio-select", this._onSelect);
  }

  attributeChangedCallback() {
    this._syncChildren();
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  set value(v) {
    this.setAttribute("value", v);
  }

  _syncChildren() {
    const value = this.value;
    const radios = this.querySelectorAll("g-radio");
    radios.forEach((radio) => {
      radio.checked = radio.value === value;
    });
  }

  _onSelect(e) {
    const value = e.detail;
    this.value = value;
    this._syncChildren();
    this.dispatchEvent(
      new CustomEvent("change", { detail: value, bubbles: true, composed: true })
    );
  }

  _render() {
    render(
      this.shadowRoot,
      <>
        <style>{`:host { display: inline-flex; flex-direction: column; gap: 8px; font-family: var(--geist-font); }`}</style>
        <slot></slot>
      </>
    );
  }
}

customElements.define("g-radio-group", GRadioGroup);
