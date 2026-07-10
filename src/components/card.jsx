const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
.card {
  border: 1px solid var(--geist-border);
  border-radius: var(--geist-radius);
  background: var(--geist-bg);
  color: var(--geist-fg);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card.hoverable:hover {
  box-shadow: var(--geist-shadow);
  transform: translateY(-2px);
}
.header,
.footer {
  padding: var(--geist-gap);
}
.header {
  border-bottom: 1px solid var(--geist-border);
}
.footer {
  border-top: 1px solid var(--geist-border);
}
.body {
  padding: var(--geist-gap);
}
.header:empty,
.footer:empty {
  display: none;
}
`;

class GeistCard extends HTMLElement {
  static get observedAttributes() {
    return ["hoverable", "shadow"];
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
    const hoverable = this.hasAttribute("hoverable");
    const shadow = this.hasAttribute("shadow");

    const vdom = (
      <>
        <style>{STYLE}</style>
        <div
          class={`card${hoverable ? " hoverable" : ""}`}
          style={shadow ? "box-shadow:var(--geist-shadow);" : ""}
        >
          <div class="header">
            <slot name="header"></slot>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-card", GeistCard);
