import { render } from "../render.js";

const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
.title {
  font-size: 14px;
  color: var(--geist-secondary);
  margin-bottom: var(--geist-gap-xs);
}
.content {
  font-size: 16px;
  color: var(--geist-fg);
  font-weight: 500;
}
`;

export class GDescription extends HTMLElement {
  static get observedAttributes() {
    return ["title", "content"];
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

  _render() {
    const title = this.getAttribute("title");
    const content = this.getAttribute("content");

    render(
      this.shadowRoot,
      <>
        <style>{STYLE}</style>
        <dl>
          <dt class="title">
            {title !== null ? title : <slot name="title"></slot>}
          </dt>
          <dd class="content">
            {content !== null ? content : <slot name="content"></slot>}
          </dd>
        </dl>
      </>
    );
  }
}

customElements.define("g-description", GDescription);
