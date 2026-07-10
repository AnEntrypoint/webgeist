import { render } from "../render.js";
import { createModalController } from "../utils/modalController.js";
import { lockBodyScroll, unlockBodyScroll } from "../utils/bodyScrollLock.js";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export class GModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._controller = createModalController();
    this._supportsDialog = typeof HTMLDialogElement !== "undefined";
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
      const dialogEl = this.shadowRoot.querySelector("dialog");
      if (this._supportsDialog && dialogEl && !dialogEl.open) {
        dialogEl.showModal();
      }
      this._focusFirst();
    } else {
      unlockBodyScroll();
      document.removeEventListener("keydown", this._onKeydown);
      const dialogEl = this.shadowRoot.querySelector("dialog");
      if (this._supportsDialog && dialogEl && dialogEl.open) {
        dialogEl.close();
      }
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

    const style = `
      :host {
        display: contents;
        font-family: var(--geist-font);
      }
      dialog {
        border: none;
        padding: 0;
        border-radius: var(--geist-radius);
        box-shadow: var(--geist-shadow);
        background: var(--geist-bg);
        color: var(--geist-fg);
        max-width: 90vw;
        max-height: 85vh;
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: ${open ? "flex" : "none"};
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .panel {
        background: var(--geist-bg);
        color: var(--geist-fg);
        border-radius: var(--geist-radius);
        box-shadow: var(--geist-shadow);
        max-width: 90vw;
        max-height: 85vh;
        overflow: auto;
        outline: none;
      }
      .header, .footer {
        padding: var(--geist-gap);
      }
      .content {
        padding: 0 var(--geist-gap) var(--geist-gap);
      }
    `;

    if (this._supportsDialog) {
      render(
        this.shadowRoot,
        <>
          <style>{style}</style>
          <dialog onClose={() => this.hide()} onClick={this._onBackdropClick}>
            <div class="panel" tabindex="-1">
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
          </dialog>
        </>
      );
    } else {
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
}

customElements.define("g-modal", GModal);
