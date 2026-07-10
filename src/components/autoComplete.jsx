import { render } from "../render.js";
import { onClickAway } from "../utils/clickAway.js";
import { onKey } from "../utils/keyboard.js";
import { cx } from "../utils/shared.js";

const STYLE = `
  :host { display: inline-block; font-family: var(--geist-font); position: relative; width: 240px; }
  input {
    width: 100%; box-sizing: border-box; border: 1px solid var(--geist-border);
    border-radius: var(--geist-radius); padding: 8px 12px; font-size: 14px;
    background: var(--geist-bg); color: var(--geist-fg); outline: none;
    font-family: var(--geist-font); transition: border-color .2s ease;
  }
  input:focus { border-color: var(--geist-accent); }
  input:disabled { opacity: .5; cursor: not-allowed; }
  .menu {
    position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 100;
    background: var(--geist-bg); border: 1px solid var(--geist-border); border-radius: var(--geist-radius);
    box-shadow: var(--geist-shadow); max-height: 240px; overflow-y: auto; padding: 4px 0;
    display: none;
  }
  .menu.open { display: block; }
  .item { padding: 8px 12px; cursor: pointer; font-size: 14px; color: var(--geist-fg); }
  .item:hover, .item.active { background: var(--geist-border); }
  .empty { padding: 8px 12px; font-size: 13px; color: var(--geist-secondary); }
`;

export class GAutoComplete extends HTMLElement {
  static get observedAttributes() {
    return ["value", "placeholder", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._options = [];
    this._open = false;
    this._activeIndex = -1;
    this._offClickAway = null;
    this._offEscape = null;
  }

  connectedCallback() {
    this._render();
    this._offClickAway = onClickAway(this, () => this._close());
    this._offEscape = onKey(this, "Escape", () => this._close());
  }

  disconnectedCallback() {
    if (this._offClickAway) this._offClickAway();
    if (this._offEscape) this._offEscape();
  }

  attributeChangedCallback() {
    this._render();
  }

  get options() {
    return this._options;
  }

  set options(list) {
    this._options = Array.isArray(list) ? list : [];
    this._render();
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  set value(v) {
    this.setAttribute("value", v);
  }

  _filtered() {
    const value = this.value.toLowerCase();
    if (!value) return this._options;
    return this._options.filter((o) => o.toLowerCase().includes(value));
  }

  _close() {
    if (!this._open) return;
    this._open = false;
    this._activeIndex = -1;
    this._render();
  }

  _select(val) {
    this.setAttribute("value", val);
    this._close();
    this.dispatchEvent(new CustomEvent("select", { detail: { value: val }, bubbles: true }));
  }

  _onInput(e) {
    this.setAttribute("value", e.target.value);
    this._open = true;
    this._activeIndex = -1;
    this._render();
  }

  _onKeyDown(e) {
    const items = this._filtered();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this._open = true;
      this._activeIndex = Math.min(this._activeIndex + 1, items.length - 1);
      this._render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
      this._render();
    } else if (e.key === "Enter") {
      if (this._open && this._activeIndex >= 0 && items[this._activeIndex]) {
        e.preventDefault();
        this._select(items[this._activeIndex]);
      }
    }
  }

  _render() {
    const items = this._filtered();
    const vdom = (
      <div class="wrapper">
        <style>{STYLE}</style>
        <input
          type="text"
          value={this.value}
          placeholder={this.getAttribute("placeholder") || ""}
          disabled={this.hasAttribute("disabled")}
          oninput={(e) => this._onInput(e)}
          onfocus={() => {
            this._open = true;
            this._render();
          }}
          onkeydown={(e) => this._onKeyDown(e)}
        />
        <div class={cx("menu", this._open && "open")}>
          {items.length
            ? items.map((item, i) => (
                <div
                  class={cx("item", i === this._activeIndex && "active")}
                  onclick={() => this._select(item)}
                >
                  {item}
                </div>
              ))
            : <div class="empty">No matches</div>}
        </div>
      </div>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-auto-complete", GAutoComplete);
