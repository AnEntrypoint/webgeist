import { render } from "../render.js";

const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
.display {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--geist-gap);
  padding: var(--geist-gap-xl) var(--geist-gap);
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.title {
  font-size: 20px;
  font-weight: 600;
  color: var(--geist-fg);
}
.caption {
  font-size: 14px;
  color: var(--geist-secondary);
}
`;

export class GDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    render(
      this.shadowRoot,
      <>
        <style>{STYLE}</style>
        <div class="display">
          <div class="content">
            <slot></slot>
          </div>
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="caption">
            <slot name="caption"></slot>
          </div>
        </div>
      </>
    );
  }
}

customElements.define("g-display", GDisplay);
