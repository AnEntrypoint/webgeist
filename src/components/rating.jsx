import { render } from "../render.js";
import { cx } from "../utils/shared.js";

const STYLE = `
  :host { display: inline-flex; font-family: var(--geist-font); }
  .stars { display: flex; gap: 2px; }
  .star {
    font-size: 22px; line-height: 1; cursor: pointer; color: var(--geist-border);
    transition: color .15s ease;
  }
  .star.filled { color: var(--geist-warning); }
  :host([readonly]) .star { cursor: default; }
`;

export class GRating extends HTMLElement {
  static get observedAttributes() {
    return ["value", "count", "readonly"];
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

  get value() {
    return this.hasAttribute("value") ? Number(this.getAttribute("value")) : 0;
  }
  set value(v) {
    this.setAttribute("value", v);
  }
  get count() {
    return this.hasAttribute("count") ? Number(this.getAttribute("count")) : 5;
  }
  get readonly() {
    return this.hasAttribute("readonly");
  }

  _setValue(v) {
    if (this.readonly) return;
    this.setAttribute("value", v);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: v }, bubbles: true }));
  }

  _render() {
    const value = this.value;
    const count = this.count;
    const stars = [];
    for (let i = 1; i <= count; i++) {
      stars.push(
        <span
          class={cx("star", i <= value && "filled")}
          onclick={() => this._setValue(i)}
        >
          &#9733;
        </span>
      );
    }

    const vdom = (
      <div class="stars">
        <style>{STYLE}</style>
        {stars}
      </div>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-rating", GRating);
