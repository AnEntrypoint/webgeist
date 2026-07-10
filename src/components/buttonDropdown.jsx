import { render } from "../render.js";
import { onClickAway } from "../utils/clickAway.js";
import { createModalController } from "../utils/modalController.js";

export class GButtonDropdown extends HTMLElement {
  static get observedAttributes() {
    return ["disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._controller = createModalController();
  }

  connectedCallback() {
    this._onToggleClick = this._onToggleClick.bind(this);
    this.shadowRoot.addEventListener("click", this._onToggleClick);
    this._unsubscribe = this._controller.subscribe(() => this._render());
    this._unClickAway = onClickAway(this, () => this._controller.hide());
    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this._onToggleClick);
    if (this._unsubscribe) this._unsubscribe();
    if (this._unClickAway) this._unClickAway();
  }

  attributeChangedCallback() {
    this._render();
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  _onToggleClick(e) {
    const trigger = e.target.closest(".trigger");
    if (!trigger) return;
    if (this.disabled) return;
    this._controller.toggle();
  }

  _render() {
    const disabled = this.disabled;
    const open = this._controller.isOpen();

    const style = `
      :host {
        display: inline-block;
        position: relative;
        font-family: var(--geist-font);
      }
      .trigger {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 38px;
        padding: 0 20px;
        border-radius: var(--geist-radius);
        border: 1px solid var(--geist-border);
        background: var(--geist-fg);
        color: var(--geist-bg);
        font-size: 14px;
        cursor: pointer;
        opacity: ${disabled ? 0.4 : 1};
        pointer-events: ${disabled ? "none" : "auto"};
      }
      .caret {
        border: solid currentColor;
        border-width: 0 2px 2px 0;
        padding: 3px;
        transform: rotate(${open ? "-135deg" : "45deg"});
        transition: transform .15s ease;
      }
      .menu {
        display: ${open ? "block" : "none"};
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        min-width: 100%;
        background: var(--geist-bg);
        border: 1px solid var(--geist-border);
        border-radius: var(--geist-radius);
        box-shadow: var(--geist-shadow);
        z-index: 100;
        overflow: hidden;
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div class="trigger" aria-haspopup="true" aria-expanded={open ? "true" : "false"}>
          <slot name="label">Options</slot>
          <span class="caret"></span>
        </div>
        <div class="menu">
          <slot></slot>
        </div>
      </>
    );
  }
}

customElements.define("g-button-dropdown", GButtonDropdown);
