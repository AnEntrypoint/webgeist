import { render } from "../render.js";

export class GCode extends HTMLElement {
  static get observedAttributes() {
    return ["block"];
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

  get block() {
    return this.hasAttribute("block");
  }

  _render() {
    const block = this.block;

    const style = `
      :host {
        display: ${block ? "block" : "inline-block"};
        font-family: var(--geist-font-mono);
      }
      .code {
        display: ${block ? "block" : "inline"};
        font-family: inherit;
        font-size: ${block ? "14px" : "0.9em"};
        line-height: 1.5;
        background: var(--geist-border);
        border: 1px solid var(--geist-border);
        border-radius: var(--geist-radius);
        padding: ${block ? "var(--geist-gap-sm) var(--geist-gap)" : "2px 6px"};
        white-space: ${block ? "pre-wrap" : "nowrap"};
        overflow-x: ${block ? "auto" : "visible"};
        color: var(--geist-fg);
      }
    `;

    const Tag = block ? "pre" : "code";

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <Tag class="code">
          <slot></slot>
        </Tag>
      </>
    );
  }
}

customElements.define("g-code", GCode);
