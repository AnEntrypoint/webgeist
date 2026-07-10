import { render } from "../render.js";

export class GCapacity extends HTMLElement {
  static get observedAttributes() {
    return ["value", "blocks"];
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
    const v = parseFloat(this.getAttribute("value"));
    if (isNaN(v)) return 0;
    return Math.min(100, Math.max(0, v));
  }

  get blocks() {
    const b = parseInt(this.getAttribute("blocks"), 10);
    return isNaN(b) || b <= 0 ? 10 : b;
  }

  _render() {
    const total = this.blocks;
    const filled = Math.round((this.value / 100) * total);

    const style = `
      :host {
        display: inline-flex;
        font-family: var(--geist-font);
      }
      .capacity {
        display: flex;
        gap: 3px;
      }
      .block {
        width: 8px;
        height: 16px;
        border-radius: 2px;
        background: var(--geist-border);
      }
      .block.filled {
        background: var(--geist-accent);
      }
    `;

    const items = [];
    for (let i = 0; i < total; i++) {
      items.push(<span class={i < filled ? "block filled" : "block"}></span>);
    }

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div class="capacity">{items}</div>
      </>
    );
  }
}

customElements.define("g-capacity", GCapacity);
