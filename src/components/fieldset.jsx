const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
.fieldset {
  border: 1px solid var(--geist-border);
  border-radius: var(--geist-radius);
  background: var(--geist-bg);
  color: var(--geist-fg);
}
.content {
  padding: var(--geist-gap);
}
.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 var(--geist-gap-xs);
}
.subtitle {
  font-size: .85rem;
  color: var(--geist-secondary);
  margin: 0;
}
.actions {
  padding: var(--geist-gap-sm) var(--geist-gap);
  border-top: 1px solid var(--geist-border);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--geist-gap-sm);
}
.actions:empty {
  display: none;
}
`;

class GeistFieldset extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const vdom = (
      <>
        <style>{STYLE}</style>
        <div class="fieldset">
          <div class="content">
            <h3 class="title">
              <slot name="title"></slot>
            </h3>
            <p class="subtitle">
              <slot name="subtitle"></slot>
            </p>
            <slot></slot>
          </div>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-fieldset", GeistFieldset);
