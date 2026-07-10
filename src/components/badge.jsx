import { render } from "../render.js";
import { cx } from "../utils/shared.js";

const TYPE_COLORS = {
  default: "var(--geist-fg)",
  success: "var(--geist-success)",
  warning: "var(--geist-warning)",
  error: "var(--geist-error)",
  secondary: "var(--geist-secondary)",
};

const STYLE = `
  :host {
    position: absolute; top: 0; right: 0; transform: translate(50%, -50%);
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--geist-font); font-size: 12px; font-weight: 600; color: #fff;
    border-radius: 999px; min-width: 18px; height: 18px; padding: 0 5px;
    line-height: 1; box-shadow: 0 0 0 2px var(--geist-bg);
  }
  :host([dot]) { min-width: 8px; width: 8px; height: 8px; padding: 0; }
`;

export class GBadge extends HTMLElement {
  static get observedAttributes() {
    return ["type", "count", "dot"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const parent = this.parentElement;
    if (parent && getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _text() {
    const count = Number(this.getAttribute("count"));
    if (!Number.isFinite(count)) return "";
    return count > 99 ? "99+" : String(count);
  }

  _render() {
    const type = this.getAttribute("type") || "default";
    const color = TYPE_COLORS[type] || TYPE_COLORS.default;
    const isDot = this.hasAttribute("dot");
    const style = `background: ${color};`;

    const vdom = (
      <div class={cx("badge")} style={style}>
        <style>{STYLE}</style>
        {!isDot ? this._text() : ""}
      </div>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-badge", GBadge);
