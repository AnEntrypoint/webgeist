import { render } from "../render.js";

const SIZE_MAP = { small: 24, medium: 40, large: 56 };

const STYLE = `
  :host { display: inline-block; }
  .avatar {
    border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;
    background: var(--geist-secondary); color: var(--geist-bg); font-family: var(--geist-font);
    font-weight: 500; user-select: none; border: 2px solid var(--geist-bg);
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

export class GAvatar extends HTMLElement {
  static get observedAttributes() {
    return ["src", "text", "size"];
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

  _size() {
    const attr = this.getAttribute("size");
    if (!attr) return SIZE_MAP.medium;
    if (SIZE_MAP[attr]) return SIZE_MAP[attr];
    const n = Number(attr);
    return Number.isFinite(n) && n > 0 ? n : SIZE_MAP.medium;
  }

  _initials() {
    const text = this.getAttribute("text") || "";
    return text
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  _render() {
    const src = this.getAttribute("src");
    const size = this._size();
    const style = `width: ${size}px; height: ${size}px; font-size: ${Math.round(size * 0.4)}px;`;

    const vdom = (
      <div class="avatar" style={style}>
        <style>{STYLE}</style>
        {src ? <img src={src} alt={this.getAttribute("text") || ""} /> : this._initials()}
      </div>
    );
    render(this.shadowRoot, vdom);
  }
}

const GROUP_STYLE = `
  :host { display: inline-flex; }
  ::slotted(g-avatar) { margin-left: -10px; }
  ::slotted(g-avatar:first-child) { margin-left: 0; }
`;

export class GAvatarGroup extends HTMLElement {
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
        <style>{GROUP_STYLE}</style>
        <slot></slot>
      </>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-avatar", GAvatar);
customElements.define("g-avatar-group", GAvatarGroup);
