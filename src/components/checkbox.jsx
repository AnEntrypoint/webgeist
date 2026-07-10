import { render } from "../render.js";

export class GCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "indeterminate", "disabled", "value"];
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

  get indeterminate() {
    return this.hasAttribute("indeterminate");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  toggle(force) {
    const next = force !== undefined ? force : !this.checked;
    this.checked = next;
    this.removeAttribute("indeterminate");
    this.dispatchEvent(
      new CustomEvent("change", { detail: next, bubbles: true, composed: true })
    );
  }

  _onClick() {
    if (this.disabled) return;
    this.toggle();
  }

  _render() {
    const checked = this.checked;
    const indeterminate = this.indeterminate;
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
      .box {
        width: 16px;
        height: 16px;
        border-radius: 3px;
        border: 1px solid ${checked || indeterminate ? "var(--geist-accent)" : "var(--geist-border)"};
        background: ${checked || indeterminate ? "var(--geist-accent)" : "transparent"};
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 11px;
        line-height: 1;
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
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : checked ? "true" : "false"}
          aria-disabled={disabled ? "true" : "false"}
        >
          <span class="box">{indeterminate ? "−" : checked ? "✓" : ""}</span>
          <span class="label">
            <slot></slot>
          </span>
        </div>
      </>
    );
  }
}

customElements.define("g-checkbox", GCheckbox);

export class GCheckboxGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._values = new Set();
  }

  connectedCallback() {
    this._onChange = this._onChange.bind(this);
    this.addEventListener("change", this._onChange);
    this._render();
  }

  disconnectedCallback() {
    this.removeEventListener("change", this._onChange);
  }

  get values() {
    return Array.from(this._values);
  }

  _onChange(e) {
    const target = e.target;
    if (!target || target.tagName !== "G-CHECKBOX") return;
    const value = target.value;
    if (target.checked) {
      this._values.add(value);
    } else {
      this._values.delete(value);
    }
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: Array.from(this._values),
        bubbles: true,
        composed: true,
      })
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

customElements.define("g-checkbox-group", GCheckboxGroup);
