import { render } from "../render.js";
import { cx } from "../utils/shared.js";

const TYPE_COLORS = {
  default: { bg: "var(--geist-fg)", fg: "var(--geist-bg)" },
  success: { bg: "var(--geist-success)", fg: "#fff" },
  warning: { bg: "var(--geist-warning)", fg: "#fff" },
  error: { bg: "var(--geist-error)", fg: "#fff" },
  secondary: { bg: "var(--geist-secondary)", fg: "#fff" },
};

const STYLE = `
  :host { display: inline-block; font-family: var(--geist-font); }
  .tag {
    display: inline-flex; align-items: center; gap: 6px; border-radius: 999px;
    padding: 2px 10px; font-size: 12px; font-weight: 500; line-height: 1.8;
  }
  .close {
    cursor: pointer; opacity: .7; font-size: 12px; line-height: 1; border: none;
    background: transparent; color: inherit; padding: 0; display: flex;
  }
  .close:hover { opacity: 1; }
`;

export class GTag extends HTMLElement {
  static get observedAttributes() {
    return ["type", "invert", "closable"];
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

  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }

  _render() {
    const type = this.getAttribute("type") || "default";
    const invert = this.hasAttribute("invert");
    const colors = TYPE_COLORS[type] || TYPE_COLORS.default;
    const style = invert
      ? `background: transparent; color: ${colors.bg}; border: 1px solid ${colors.bg};`
      : `background: ${colors.bg}; color: ${colors.fg}; border: 1px solid ${colors.bg};`;

    const vdom = (
      <span class={cx("tag")} style={style}>
        <style>{STYLE}</style>
        <slot></slot>
        {this.hasAttribute("closable") ? (
          <button class="close" onclick={() => this._close()} aria-label="Remove">
            &#10005;
          </button>
        ) : (
          ""
        )}
      </span>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-tag", GTag);
