import { render } from "../render.js";
import { onClickAway } from "../utils/clickAway.js";
import { onKey } from "../utils/keyboard.js";
import { cx } from "../utils/shared.js";

const STYLE = `
  :host { display: inline-block; font-family: var(--geist-font); position: relative; min-width: 180px; }
  .control {
    display: flex; align-items: center; justify-content: space-between;
    border: 1px solid var(--geist-border); border-radius: var(--geist-radius);
    padding: 8px 12px; cursor: pointer; background: var(--geist-bg); color: var(--geist-fg);
    font-size: 14px; user-select: none;
  }
  .control:hover { border-color: var(--geist-accent); }
  .control.open { border-color: var(--geist-accent); }
  .arrow { transition: transform .2s ease; opacity: .6; margin-left: 8px; }
  .control.open .arrow { transform: rotate(180deg); }
  .menu {
    position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 100;
    background: var(--geist-bg); border: 1px solid var(--geist-border); border-radius: var(--geist-radius);
    box-shadow: var(--geist-shadow); max-height: 240px; overflow-y: auto; padding: 4px 0;
    display: none;
  }
  .menu.open { display: block; }
  ::slotted(g-select-option) { display: block; }
  .placeholder { color: var(--geist-secondary); }
`;

export class GSelect extends HTMLElement {
  static get observedAttributes() {
    return ["value", "placeholder", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._open = false;
    this._activeIndex = -1;
    this._offClickAway = null;
    this._offEscape = null;
    this._onSlotChange = this._onSlotChange.bind(this);
  }

  connectedCallback() {
    this._render();
    this._offClickAway = onClickAway(this, () => this._close());
    this._offEscape = onKey(this, "Escape", () => this._close());
    this.addEventListener("keydown", this._onKeyDown.bind(this));
  }

  disconnectedCallback() {
    if (this._offClickAway) this._offClickAway();
    if (this._offEscape) this._offEscape();
  }

  attributeChangedCallback() {
    this._render();
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  set value(v) {
    this.setAttribute("value", v);
  }

  _options() {
    return Array.from(this.querySelectorAll("g-select-option"));
  }

  _onSlotChange() {
    this._render();
  }

  _toggle() {
    if (this.hasAttribute("disabled")) return;
    this._open ? this._close() : this._openMenu();
  }

  _openMenu() {
    this._open = true;
    this._render();
  }

  _close() {
    if (!this._open) return;
    this._open = false;
    this._render();
  }

  _selectOption(opt) {
    const val = opt.getAttribute("value");
    this.setAttribute("value", val);
    this._close();
    this.dispatchEvent(new CustomEvent("change", { detail: { value: val }, bubbles: true }));
  }

  _onKeyDown(e) {
    const opts = this._options();
    if (!opts.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!this._open) this._openMenu();
      this._activeIndex = Math.min(this._activeIndex + 1, opts.length - 1);
      this._render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!this._open) this._openMenu();
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
      this._render();
    } else if (e.key === "Enter") {
      if (this._open && this._activeIndex >= 0) {
        e.preventDefault();
        this._selectOption(opts[this._activeIndex]);
      }
    }
  }

  _render() {
    const opts = this._options();
    const value = this.value;
    const selected = opts.find((o) => o.getAttribute("value") === value);
    const placeholder = this.getAttribute("placeholder") || "Select...";

    const vdom = (
      <div class="wrapper">
        <style>{STYLE}</style>
        <div
          class={cx("control", this._open && "open")}
          onclick={() => this._toggle()}
        >
          <span class={cx(!selected && "placeholder")}>
            {selected ? selected.textContent : placeholder}
          </span>
          <span class="arrow">&#9662;</span>
        </div>
        <div class={cx("menu", this._open && "open")}>
          <slot onslotchange={this._onSlotChange}></slot>
        </div>
      </div>
    );

    render(this.shadowRoot, vdom);

    opts.forEach((opt, i) => {
      opt._setActive && opt._setActive(i === this._activeIndex);
      opt._setSelected && opt._setSelected(opt.getAttribute("value") === value);
      opt.onclick = () => this._selectOption(opt);
    });
  }
}

const OPTION_STYLE = `
  :host {
    display: block; padding: 8px 12px; cursor: pointer; font-size: 14px;
    color: var(--geist-fg); font-family: var(--geist-font);
  }
  :host(:hover), :host([active]) { background: var(--geist-border); }
  :host([selected]) { color: var(--geist-accent); font-weight: 500; }
`;

export class GSelectOption extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._render();
  }

  _setActive(isActive) {
    if (isActive) this.setAttribute("active", "");
    else this.removeAttribute("active");
  }

  _setSelected(isSelected) {
    if (isSelected) this.setAttribute("selected", "");
    else this.removeAttribute("selected");
  }

  _render() {
    const vdom = (
      <>
        <style>{OPTION_STYLE}</style>
        <slot></slot>
      </>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-select", GSelect);
customElements.define("g-select-option", GSelectOption);
