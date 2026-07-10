import { render } from "../render.js";

export class GToggle extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled"];
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

  _onClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent("change", { detail: this.checked, bubbles: true, composed: true })
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
      .track {
        width: 40px;
        height: 22px;
        border-radius: 999px;
        background: ${checked ? "var(--geist-accent)" : "var(--geist-border)"};
        position: relative;
        cursor: pointer;
        transition: background .2s ease;
        opacity: ${disabled ? 0.4 : 1};
        pointer-events: ${disabled ? "none" : "auto"};
      }
      .thumb {
        position: absolute;
        top: 2px;
        left: ${checked ? "20px" : "2px"};
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        box-shadow: var(--geist-shadow);
        transition: left .2s ease;
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div
          class="track"
          role="switch"
          aria-checked={checked ? "true" : "false"}
          aria-disabled={disabled ? "true" : "false"}
        >
          <div class="thumb"></div>
        </div>
      </>
    );
  }
}

customElements.define("g-toggle", GToggle);
