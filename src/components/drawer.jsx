import { render } from "../render.js";
import { createModalController } from "../utils/modalController.js";
import { lockBodyScroll, unlockBodyScroll } from "../utils/bodyScrollLock.js";

const PLACEMENTS = ["left", "right", "top", "bottom"];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const TRANSFORM_CLOSED = {
  left: "translateX(-100%)",
  right: "translateX(100%)",
  top: "translateY(-100%)",
  bottom: "translateY(100%)",
};

export class GDrawer extends HTMLElement {
  static get observedAttributes() {
    return ["placement"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._controller = createModalController();
    this._previouslyFocused = null;
  }

  connectedCallback() {
    this._onKeydown = this._onKeydown.bind(this);
    this._onBackdropClick = this._onBackdropClick.bind(this);
    this._unsubscribe = this._controller.subscribe((open) => {
      this._onStateChange(open);
    });
    this._render();
  }

  disconnectedCallback() {
    if (this._unsubscribe) this._unsubscribe();
    document.removeEventListener("keydown", this._onKeydown);
    if (this._controller.isOpen()) unlockBodyScroll();
  }

  attributeChangedCallback() {
    this._render();
  }

  get placement() {
    const p = this.getAttribute("placement");
    return PLACEMENTS.includes(p) ? p : "right";
  }

  show() {
    this._controller.show();
  }

  hide() {
    this._controller.hide();
  }

  get open() {
    return this._controller.isOpen();
  }

  _onStateChange(open) {
    this._render();
    if (open) {
      this._previouslyFocused = document.activeElement;
      lockBodyScroll();
      document.addEventListener("keydown", this._onKeydown);
      this._focusFirst();
    } else {
      unlockBodyScroll();
      document.removeEventListener("keydown", this._onKeydown);
      if (this._previouslyFocused && this._previouslyFocused.focus) {
        this._previouslyFocused.focus();
      }
      this._previouslyFocused = null;
    }
  }

  _focusFirst() {
    const focusables = this._getFocusable();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      const container = this.shadowRoot.querySelector(".panel");
      if (container) container.focus();
    }
  }

  _getFocusable() {
    const container = this.shadowRoot.querySelector(".panel");
    if (!container) return [];
    const slotted = Array.from(this.querySelectorAll(FOCUSABLE_SELECTOR));
    const internal = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
    return [...internal, ...slotted].filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );
  }

  _onKeydown(e) {
    if (!this._controller.isOpen()) return;
    if (e.key === "Escape") {
      e.preventDefault();
      this.hide();
      return;
    }
    if (e.key === "Tab") {
      const focusables = this._getFocusable();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = this.shadowRoot.activeElement || document.activeElement;
      if (e.shiftKey) {
        if (active === first || !focusables.includes(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !focusables.includes(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  _onBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this.hide();
    }
  }

  _render() {
    const open = this._controller.isOpen();
    const placement = this.placement;

    const panelPos = {
      left: "top: 0; left: 0; bottom: 0; width: min(360px, 90vw); height: 100%;",
      right: "top: 0; right: 0; bottom: 0; width: min(360px, 90vw); height: 100%;",
      top: "top: 0; left: 0; right: 0; height: min(360px, 90vh); width: 100%;",
      bottom: "bottom: 0; left: 0; right: 0; height: min(360px, 90vh); width: 100%;",
    }[placement];

    const style = `
      :host {
        display: contents;
        font-family: var(--geist-font);
      }
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: ${open ? "block" : "none"};
        z-index: 1000;
      }
      .panel {
        position: fixed;
        ${panelPos}
        background: var(--geist-bg);
        color: var(--geist-fg);
        box-shadow: var(--geist-shadow);
        overflow: auto;
        outline: none;
        display: flex;
        flex-direction: column;
        transform: ${open ? "translate(0, 0)" : TRANSFORM_CLOSED[placement]};
        transition: transform 0.25s ease;
      }
      .header, .footer {
        padding: var(--geist-gap);
        flex: none;
      }
      .content {
        padding: 0 var(--geist-gap) var(--geist-gap);
        flex: 1 1 auto;
        overflow: auto;
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div class="overlay" onClick={this._onBackdropClick}>
          <div class="panel" tabindex="-1" role="dialog" aria-modal="true">
            <div class="header">
              <slot name="header"></slot>
            </div>
            <div class="content">
              <slot name="content"></slot>
            </div>
            <div class="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </>
    );
  }
}

customElements.define("g-drawer", GDrawer);
