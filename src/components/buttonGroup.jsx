import { render } from "../render.js";

export class GButtonGroup extends HTMLElement {
  static get observedAttributes() {
    return ["vertical"];
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

  get vertical() {
    return this.hasAttribute("vertical");
  }

  _render() {
    const vertical = this.vertical;

    const style = `
      :host {
        display: inline-flex;
      }
      .group {
        display: inline-flex;
        flex-direction: ${vertical ? "column" : "row"};
      }
      ::slotted(g-button) {
        border-radius: 0;
        margin-${vertical ? "top" : "left"}: -1px;
      }
      ::slotted(g-button:first-child) {
        margin: 0;
        border-top-left-radius: var(--geist-radius);
        border-${vertical ? "top-right" : "bottom-left"}-radius: var(--geist-radius);
      }
      ::slotted(g-button:last-child) {
        border-bottom-right-radius: var(--geist-radius);
        border-${vertical ? "bottom-left" : "top-right"}-radius: var(--geist-radius);
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <div class="group">
          <slot></slot>
        </div>
      </>
    );
  }
}

customElements.define("g-button-group", GButtonGroup);
