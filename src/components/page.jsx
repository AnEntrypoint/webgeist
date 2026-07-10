import { render } from "../render.js";

const PAGE_STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
.page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--geist-gap-lg);
  display: flex;
  flex-direction: column;
  gap: var(--geist-gap-xl);
}
`;

export class GPage extends HTMLElement {
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
        <style>{PAGE_STYLE}</style>
        <div class="page">
          <slot name="header"></slot>
          <slot name="content"></slot>
          <slot></slot>
          <slot name="footer"></slot>
        </div>
      </>
    );
  }
}

const SECTION_STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
`;

export class GPageHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(
      this.shadowRoot,
      <>
        <style>{SECTION_STYLE}</style>
        <slot></slot>
      </>
    );
  }
}

export class GPageContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(
      this.shadowRoot,
      <>
        <style>{SECTION_STYLE}</style>
        <slot></slot>
      </>
    );
  }
}

export class GPageFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(
      this.shadowRoot,
      <>
        <style>{SECTION_STYLE}</style>
        <slot></slot>
      </>
    );
  }
}

customElements.define("g-page", GPage);
customElements.define("g-page-header", GPageHeader);
customElements.define("g-page-content", GPageContent);
customElements.define("g-page-footer", GPageFooter);
