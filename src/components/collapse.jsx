import { render } from "../render.js";
import { uid } from "../utils/shared.js";

const COLLAPSE_STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
  border-bottom: 1px solid var(--geist-border);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--geist-gap) 0;
  cursor: pointer;
  user-select: none;
}
.title {
  font-size: 16px;
  color: var(--geist-fg);
}
.icon {
  transition: transform .2s ease;
  color: var(--geist-secondary);
}
.icon.expanded {
  transform: rotate(180deg);
}
.body-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height .25s ease;
}
.body-wrap.expanded {
  max-height: var(--collapse-max-height, 1000px);
}
.body {
  padding-bottom: var(--geist-gap);
  color: var(--geist-secondary);
}
`;

export class GCollapse extends HTMLElement {
  static get observedAttributes() {
    return ["title", "expanded"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._id = uid("g-collapse");
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  get expanded() {
    return this.hasAttribute("expanded");
  }

  set expanded(value) {
    this.toggleAttribute("expanded", !!value);
  }

  toggle() {
    const group = this.closest("g-collapse-group");
    if (group) {
      group._onItemToggle(this);
    } else {
      this.expanded = !this.expanded;
    }
    this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: this.expanded,
        bubbles: true,
        composed: true,
      })
    );
  }

  _render() {
    const expanded = this.expanded;

    render(
      this.shadowRoot,
      <>
        <style>{COLLAPSE_STYLE}</style>
        <div class="header" onclick={() => this.toggle()}>
          <span class="title">{this.getAttribute("title") || ""}</span>
          <span class={`icon${expanded ? " expanded" : ""}`}>&#9660;</span>
        </div>
        <div class={`body-wrap${expanded ? " expanded" : ""}`}>
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </>
    );
  }
}

const GROUP_STYLE = `
:host {
  display: block;
}
`;

export class GCollapseGroup extends HTMLElement {
  static get observedAttributes() {
    return ["accordion"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(
      this.shadowRoot,
      <>
        <style>{GROUP_STYLE}</style>
        <slot></slot>
      </>
    );
  }

  get accordion() {
    return this.hasAttribute("accordion");
  }

  get _items() {
    return Array.from(this.querySelectorAll("g-collapse"));
  }

  _onItemToggle(item) {
    if (this.accordion) {
      const willExpand = !item.expanded;
      this._items.forEach((el) => {
        el.expanded = el === item ? willExpand : false;
      });
    } else {
      item.expanded = !item.expanded;
    }
  }
}

customElements.define("g-collapse", GCollapse);
customElements.define("g-collapse-group", GCollapseGroup);
