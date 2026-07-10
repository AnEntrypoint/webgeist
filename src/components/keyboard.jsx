import { render } from "../render.js";

export class GKeyboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font-mono);
      }
      .key {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        padding: 2px 8px;
        font-size: 12px;
        font-family: inherit;
        color: var(--geist-secondary);
        background: var(--geist-bg);
        border: 1px solid var(--geist-border);
        border-bottom-width: 3px;
        border-radius: 4px;
        box-shadow: var(--geist-shadow);
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <kbd class="key">
          <slot></slot>
        </kbd>
      </>
    );
  }
}

customElements.define("g-keyboard", GKeyboard);
