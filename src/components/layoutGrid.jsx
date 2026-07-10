const COLUMNS = 24;

const ROW_STYLE = `
:host {
  display: block;
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
`;

const JUSTIFY_MAP = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  "space-around": "space-around",
  "space-between": "space-between",
  "space-evenly": "space-evenly",
};

const ALIGN_MAP = {
  top: "flex-start",
  middle: "center",
  bottom: "flex-end",
  stretch: "stretch",
};

class GeistRow extends HTMLElement {
  static get observedAttributes() {
    return ["gutter", "justify", "align"];
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
    const gutter = parseFloat(this.getAttribute("gutter")) || 0;
    const justify = JUSTIFY_MAP[this.getAttribute("justify")] || "flex-start";
    const align = ALIGN_MAP[this.getAttribute("align")] || "flex-start";

    this.style.setProperty("--g-row-gutter", `${gutter}px`);

    const vdom = (
      <>
        <style>{ROW_STYLE}</style>
        <div
          class="row"
          style={`justify-content:${justify};align-items:${align};margin-left:-${
            gutter / 2
          }px;margin-right:-${gutter / 2}px;`}
        >
          <slot></slot>
        </div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

const COL_STYLE = `
:host {
  box-sizing: border-box;
  display: block;
  padding-left: var(--g-col-gutter-half, 0px);
  padding-right: var(--g-col-gutter-half, 0px);
}
.col {
  width: 100%;
  box-sizing: border-box;
}
`;

class GeistCol extends HTMLElement {
  static get observedAttributes() {
    return ["span", "offset"];
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
    const span = Math.min(
      COLUMNS,
      parseInt(this.getAttribute("span"), 10) || COLUMNS
    );
    const offset = parseInt(this.getAttribute("offset"), 10) || 0;

    const widthPct = (span / COLUMNS) * 100;
    const offsetPct = (offset / COLUMNS) * 100;

    this.style.flex = `0 0 ${widthPct}%`;
    this.style.maxWidth = `${widthPct}%`;
    this.style.marginLeft = offset ? `${offsetPct}%` : "";

    const vdom = (
      <>
        <style>{COL_STYLE}</style>
        <div class="col">
          <slot></slot>
        </div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-row", GeistRow);
customElements.define("g-col", GeistCol);
