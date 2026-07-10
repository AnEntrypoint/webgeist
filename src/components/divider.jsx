const STYLE = `
:host {
  display: block;
  width: 100%;
}
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--geist-secondary);
  font-family: var(--geist-font);
}
.divider.vertical {
  flex-direction: column;
  display: inline-flex;
  height: 100%;
  width: auto;
}
.line {
  flex: 1;
  background: var(--geist-border);
}
.divider:not(.vertical) .line {
  height: 1px;
}
.divider.vertical .line {
  width: 1px;
}
.label {
  padding: 0 var(--geist-gap-sm);
  font-size: 14px;
  white-space: nowrap;
}
.divider.vertical .label {
  padding: var(--geist-gap-sm) 0;
}
.line-only {
  height: 1px;
  width: 100%;
  background: var(--geist-border);
}
.divider.vertical .line-only {
  width: 1px;
  height: 100%;
}
`;

class GeistDivider extends HTMLElement {
  static get observedAttributes() {
    return ["vertical"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hasLabel = false;
  }

  connectedCallback() {
    this._render();
    this._slotEl = this.shadowRoot.querySelector("slot");
    if (this._slotEl) {
      this._slotEl.addEventListener("slotchange", this._onSlotChange);
    }
    this._onSlotChange();
  }

  disconnectedCallback() {
    if (this._slotEl) {
      this._slotEl.removeEventListener("slotchange", this._onSlotChange);
    }
  }

  attributeChangedCallback() {
    this._render();
  }

  _onSlotChange = () => {
    const slotEl = this.shadowRoot.querySelector("slot");
    if (!slotEl) return;
    const nodes = slotEl.assignedNodes({ flatten: true });
    const hasContent = nodes.some(
      (n) => n.nodeType !== Node.TEXT_NODE || n.textContent.trim().length > 0
    );
    if (hasContent !== this._hasLabel) {
      this._hasLabel = hasContent;
      this._render();
    }
  };

  _render() {
    const vertical = this.hasAttribute("vertical");

    const vdom = (
      <>
        <style>{STYLE}</style>
        <div class={`divider${vertical ? " vertical" : ""}`}>
          {this._hasLabel ? (
            <>
              <div class="line"></div>
              <div class="label">
                <slot></slot>
              </div>
              <div class="line"></div>
            </>
          ) : (
            <div class="line-only">
              <slot style="display:none"></slot>
            </div>
          )}
        </div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-divider", GeistDivider);
