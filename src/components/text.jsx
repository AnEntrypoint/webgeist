const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "small", "b"];

const SIZE_MAP = {
  h1: "var(--geist-text-h1-size, 2.5rem)",
  h2: "var(--geist-text-h2-size, 2rem)",
  h3: "var(--geist-text-h3-size, 1.5rem)",
  h4: "var(--geist-text-h4-size, 1.25rem)",
  h5: "var(--geist-text-h5-size, 1rem)",
  h6: "var(--geist-text-h6-size, .85rem)",
  p: "var(--geist-text-p-size, 1rem)",
  small: "var(--geist-text-small-size, .75rem)",
  b: "var(--geist-text-b-size, 1rem)",
};

const WEIGHT_MAP = {
  h1: "var(--geist-text-h1-weight, 600)",
  h2: "var(--geist-text-h2-weight, 600)",
  h3: "var(--geist-text-h3-weight, 600)",
  h4: "var(--geist-text-h4-weight, 600)",
  h5: "var(--geist-text-h5-weight, 600)",
  h6: "var(--geist-text-h6-weight, 600)",
  p: "var(--geist-text-p-weight, 400)",
  small: "var(--geist-text-small-weight, 400)",
  b: "var(--geist-text-b-weight, 600)",
};

const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
  color: var(--geist-fg);
}
.text {
  margin: 0;
  font-size: var(--g-text-size);
  font-weight: var(--g-text-weight);
  line-height: 1.5;
}
`;

class GeistText extends HTMLElement {
  static get observedAttributes() {
    return ["type"];
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
    let type = this.getAttribute("type") || "p";
    if (!TAGS.includes(type)) type = "p";

    const Tag = type === "small" || type === "b" ? type : type;

    this.style.setProperty("--g-text-size", SIZE_MAP[type]);
    this.style.setProperty("--g-text-weight", WEIGHT_MAP[type]);

    const vdom = (
      <>
        <style>{STYLE}</style>
        <Tag class="text">
          <slot></slot>
        </Tag>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-text", GeistText);
