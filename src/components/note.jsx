const TYPE_COLOR = {
  default: "var(--geist-border)",
  success: "var(--geist-success)",
  warning: "var(--geist-warning)",
  error: "var(--geist-error)",
};

const STYLE = `
:host { display: block; font-family: var(--geist-font); }
.note {
  border-left: 3px solid var(--accent, var(--geist-border));
  background: var(--geist-bg);
  border-radius: var(--geist-radius);
  padding: var(--geist-gap-sm) var(--geist-gap);
  color: var(--geist-fg);
}
.label {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-right: var(--geist-gap-sm);
  color: var(--accent, var(--geist-secondary));
}
.content { font-size: 14px; }
`;

class GeistNote extends HTMLElement {
  static get observedAttributes() {
    return ["type", "label"];
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

  _render() {
    const type = this.getAttribute("type") || "default";
    const label = this.getAttribute("label") || type;
    const accent = TYPE_COLOR[type] || TYPE_COLOR.default;

    const vdom = (
      <>
        <style>{STYLE}</style>
        <div class="note" style={`--accent: ${accent};`}>
          <span class="label">{label}</span>
          <span class="content">
            <slot></slot>
          </span>
        </div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-note", GeistNote);
