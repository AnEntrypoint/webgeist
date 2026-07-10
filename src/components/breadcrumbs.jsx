import { render } from "../render.js";

const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
.crumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--geist-gap-xs);
  font-size: 14px;
  color: var(--geist-secondary);
}
.divider {
  color: var(--geist-border);
  padding: 0 2px;
}
.current {
  color: var(--geist-fg);
  font-weight: 500;
}
a {
  color: var(--geist-secondary);
  text-decoration: none;
}
a:hover {
  color: var(--geist-fg);
  text-decoration: underline;
}
`;

export class GBreadcrumbs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._items = null;
  }

  connectedCallback() {
    this._render();
    this._slotEl = this.shadowRoot.querySelector("slot");
    if (this._slotEl) {
      this._slotEl.addEventListener("slotchange", () => this._render());
    }
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
    this._render();
  }

  _render() {
    const items = this._items;

    if (Array.isArray(items)) {
      render(
        this.shadowRoot,
        <>
          <style>{STYLE}</style>
          <div class="crumbs">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <>
                  {i > 0 && <span class="divider">/</span>}
                  {isLast ? (
                    <span class="current">{item.text}</span>
                  ) : (
                    <a href={item.href}>{item.text}</a>
                  )}
                </>
              );
            })}
          </div>
        </>
      );
      return;
    }

    render(
      this.shadowRoot,
      <>
        <style>{STYLE}</style>
        <div class="crumbs">
          <slot></slot>
        </div>
      </>
    );
  }
}

customElements.define("g-breadcrumbs", GBreadcrumbs);
