import { render } from "../render.js";
import { copyToClipboard } from "../utils/clipboard.js";

export class GSnippet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._copied = false;
  }

  connectedCallback() {
    this._render();
  }

  async _onCopy() {
    const text = this.textContent.trim();
    const ok = await copyToClipboard(text);
    if (ok) {
      this._copied = true;
      this._render();
      clearTimeout(this._copyTimer);
      this._copyTimer = setTimeout(() => {
        this._copied = false;
        this._render();
      }, 1500);
    }
  }

  disconnectedCallback() {
    clearTimeout(this._copyTimer);
  }

  _render() {
    const copied = this._copied;

    const style = `
      :host {
        display: block;
        font-family: var(--geist-font-mono);
      }
      .snippet {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--geist-gap);
        background: var(--geist-border);
        border: 1px solid var(--geist-border);
        border-radius: var(--geist-radius);
        padding: var(--geist-gap-sm) var(--geist-gap);
        font-size: 14px;
        color: var(--geist-fg);
      }
      .code {
        font-family: inherit;
        white-space: pre;
        overflow-x: auto;
      }
      button {
        flex-shrink: 0;
        font-family: var(--geist-font);
        font-size: 12px;
        border: 1px solid var(--geist-border);
        background: var(--geist-bg);
        color: var(--geist-fg);
        border-radius: var(--geist-radius);
        padding: 4px 10px;
        cursor: pointer;
      }
      button:active {
        transform: scale(0.98);
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div class="snippet">
          <code class="code">
            <slot></slot>
          </code>
          <button type="button" onclick={() => this._onCopy()}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </>
    );
  }
}

customElements.define("g-snippet", GSnippet);
