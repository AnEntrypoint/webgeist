const STYLE = `
:host { display: inline-flex; align-items: center; gap: var(--geist-gap-sm); font-family: var(--geist-font); }
.avatar {
  width: 32px; height: 32px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
  background: var(--geist-secondary); color: var(--geist-bg); display: flex; align-items: center; justify-content: center;
  font-weight: 500; font-size: 13px;
}
.avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.meta { display: flex; flex-direction: column; line-height: 1.3; }
.name { font-size: 14px; font-weight: 500; color: var(--geist-fg); }
.text { font-size: 12px; color: var(--geist-secondary); }
`;

class GeistUser extends HTMLElement {
  static get observedAttributes() {
    return ["src", "name", "text"];
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

  _initials() {
    const name = this.getAttribute("name") || "";
    return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  }

  _render() {
    const src = this.getAttribute("src");
    const name = this.getAttribute("name") || "";
    const text = this.getAttribute("text") || "";

    const vdom = (
      <>
        <style>{STYLE}</style>
        <span class="avatar">
          {src ? <img src={src} alt={name} /> : this._initials()}
        </span>
        <span class="meta">
          <span class="name">{name}</span>
          {text ? <span class="text">{text}</span> : null}
        </span>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-user", GeistUser);
