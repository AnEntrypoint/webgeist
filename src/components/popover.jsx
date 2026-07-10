import { render } from "../render.js";
import { onClickAway } from "../utils/clickAway.js";

const PLACEMENTS = ["top", "bottom", "left", "right"];

export class GPopover extends HTMLElement {
  static get observedAttributes() {
    return ["placement", "open"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._open = false;
  }

  connectedCallback() {
    this._onTriggerClick = this._onTriggerClick.bind(this);
    this._onReposition = this._onReposition.bind(this);
    this.shadowRoot.addEventListener("click", this._onTriggerClick);
    window.addEventListener("scroll", this._onReposition, true);
    window.addEventListener("resize", this._onReposition);
    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this._onTriggerClick);
    window.removeEventListener("scroll", this._onReposition, true);
    window.removeEventListener("resize", this._onReposition);
    if (this._unbindClickAway) {
      this._unbindClickAway();
      this._unbindClickAway = null;
    }
  }

  attributeChangedCallback() {
    this._render();
  }

  get placement() {
    const p = this.getAttribute("placement");
    return PLACEMENTS.includes(p) ? p : "bottom";
  }

  _onTriggerClick(e) {
    const trigger = e.composedPath().find(
      (n) => n && n.getAttribute && n.getAttribute("slot") === "trigger"
    );
    if (trigger) {
      this._toggle();
    }
  }

  _toggle() {
    if (this._open) this.close();
    else this.open();
  }

  open() {
    if (this._open) return;
    this._open = true;
    this._render();
    this._position();
    if (!this._unbindClickAway) {
      this._unbindClickAway = onClickAway(this, () => this.close());
    }
  }

  close() {
    if (!this._open) return;
    this._open = false;
    this._render();
    if (this._unbindClickAway) {
      this._unbindClickAway();
      this._unbindClickAway = null;
    }
  }

  _onReposition() {
    if (this._open) this._position();
  }

  _position() {
    const triggerEl = this.querySelector('[slot="trigger"]');
    const contentEl = this.shadowRoot.querySelector(".content");
    if (!triggerEl || !contentEl) return;

    const rect = triggerEl.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();
    const gap = 8;
    let top = 0;
    let left = 0;

    switch (this.placement) {
      case "top":
        top = rect.top - contentRect.height - gap;
        left = rect.left + rect.width / 2 - contentRect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - contentRect.width / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - contentRect.height / 2;
        left = rect.left - contentRect.width - gap;
        break;
      case "right":
        top = rect.top + rect.height / 2 - contentRect.height / 2;
        left = rect.right + gap;
        break;
    }

    contentEl.style.top = `${top}px`;
    contentEl.style.left = `${left}px`;
  }

  _render() {
    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font);
      }
      .content {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background: var(--geist-bg);
        color: var(--geist-fg);
        border: 1px solid var(--geist-border);
        border-radius: var(--geist-radius);
        box-shadow: var(--geist-shadow);
        padding: var(--geist-gap-sm);
        display: ${this._open ? "block" : "none"};
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <slot name="trigger"></slot>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </>
    );

    if (this._open) this._position();
  }
}

customElements.define("g-popover", GPopover);
