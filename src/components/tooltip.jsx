import { render } from "../render.js";

const PLACEMENTS = ["top", "bottom", "left", "right"];

function computePosition(triggerRect, contentRect, placement, gap) {
  let top = 0;
  let left = 0;
  switch (placement) {
    case "top":
      top = triggerRect.top - contentRect.height - gap;
      left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      break;
    case "bottom":
      top = triggerRect.bottom + gap;
      left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      break;
    case "left":
      top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
      left = triggerRect.left - contentRect.width - gap;
      break;
    case "right":
      top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
      left = triggerRect.right + gap;
      break;
  }
  return { top, left };
}

export class GTooltip extends HTMLElement {
  static get observedAttributes() {
    return ["text", "placement"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._visible = false;
  }

  connectedCallback() {
    this._onEnter = this._onEnter.bind(this);
    this._onLeave = this._onLeave.bind(this);
    this._onReposition = this._onReposition.bind(this);
    this.addEventListener("mouseenter", this._onEnter);
    this.addEventListener("mouseleave", this._onLeave);
    window.addEventListener("scroll", this._onReposition, true);
    window.addEventListener("resize", this._onReposition);
    this._render();
  }

  disconnectedCallback() {
    this.removeEventListener("mouseenter", this._onEnter);
    this.removeEventListener("mouseleave", this._onLeave);
    window.removeEventListener("scroll", this._onReposition, true);
    window.removeEventListener("resize", this._onReposition);
  }

  attributeChangedCallback() {
    this._render();
  }

  get text() {
    return this.getAttribute("text") || "";
  }

  get placement() {
    const p = this.getAttribute("placement");
    return PLACEMENTS.includes(p) ? p : "top";
  }

  _onEnter() {
    this._visible = true;
    this._render();
    this._position();
  }

  _onLeave() {
    this._visible = false;
    this._render();
  }

  _onReposition() {
    if (this._visible) this._position();
  }

  _position() {
    const triggerEl = this.querySelector('[slot="trigger"]') || this;
    const contentEl = this.shadowRoot.querySelector(".tooltip");
    if (!triggerEl || !contentEl) return;
    const triggerRect = triggerEl.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();
    const { top, left } = computePosition(triggerRect, contentRect, this.placement, 6);
    contentEl.style.top = `${top}px`;
    contentEl.style.left = `${left}px`;
  }

  _render() {
    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font);
      }
      .tooltip {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background: var(--geist-fg);
        color: var(--geist-bg);
        border-radius: var(--geist-radius);
        padding: 4px 8px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        display: ${this._visible ? "block" : "none"};
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <slot name="trigger"></slot>
        <div class="tooltip">{this.text}</div>
      </>
    );

    if (this._visible) this._position();
  }
}

customElements.define("g-tooltip", GTooltip);
