import { render } from "../render.js";

const STYLE = `
:host {
  display: inline-block;
  font-family: var(--geist-font);
}
a {
  display: inline-flex;
  align-items: center;
  gap: var(--geist-gap-xs);
  color: var(--link-color, var(--geist-accent));
  text-decoration: none;
  background-image: linear-gradient(var(--link-color, var(--geist-accent)), var(--link-color, var(--geist-accent)));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 1px;
  transition: background-size .2s ease;
  cursor: pointer;
}
a:hover {
  background-size: 100% 1px;
}
.icon {
  display: inline-flex;
  align-items: center;
}
`;

export class GLink extends HTMLElement {
  static get observedAttributes() {
    return ["href", "icon", "color"];
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

  get href() {
    return this.getAttribute("href") || "#";
  }

  get icon() {
    return this.getAttribute("icon") || "";
  }

  get iconLeft() {
    return this.hasAttribute("icon-left");
  }

  get color() {
    return this.getAttribute("color");
  }

  _render() {
    const color = this.color;
    const icon = this.icon;
    const iconLeft = this.iconLeft;

    render(
      this.shadowRoot,
      <>
        <style>{STYLE}</style>
        <a
          href={this.href}
          style={color ? `--link-color: ${color}` : undefined}
        >
          {icon && iconLeft && <span class="icon">{icon}</span>}
          <slot></slot>
          {icon && !iconLeft && <span class="icon">{icon}</span>}
        </a>
      </>
    );
  }
}

customElements.define("g-link", GLink);
