import { cx } from "../utils/shared.js";

const BREAKPOINTS = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 };

function getItemLayout(val) {
  if (val === undefined || val === false) {
    return { grow: 1, width: "100%", basis: "0", display: "inherit" };
  }
  if (val === 0) {
    return { grow: 0, width: "0", basis: "0", display: "none" };
  }
  const width = (100 / 24) * val;
  const ratio = width > 100 ? "100%" : width < 0 ? "0" : `${width}%`;
  return { grow: 0, width: ratio, basis: ratio, display: "inherit" };
}

class GeistGrid extends HTMLElement {
  static get observedAttributes() {
    return ["xs", "sm", "md", "lg", "xl", "justify", "direction", "align-items", "align-content"];
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

  _num(attr) {
    const v = this.getAttribute(attr);
    if (v === null) return undefined;
    if (v === "" || v === "true") return true;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }

  _render() {
    const xs = this._num("xs");
    const sm = this._num("sm");
    const md = this._num("md");
    const lg = this._num("lg");
    const xl = this._num("xl");
    const justify = this.getAttribute("justify");
    const direction = this.getAttribute("direction");
    const alignItems = this.getAttribute("align-items");
    const alignContent = this.getAttribute("align-content");

    const layout = {
      xs: getItemLayout(xs),
      sm: getItemLayout(sm),
      md: getItemLayout(md),
      lg: getItemLayout(lg),
      xl: getItemLayout(xl),
    };

    const style = `
      :host { display: block; }
      .item {
        height: auto;
        flex-grow: ${layout.xs.grow};
        max-width: ${layout.xs.width};
        flex-basis: ${layout.xs.basis};
        display: ${layout.xs.display};
        ${justify ? `justify-content: ${justify};` : ""}
        ${direction ? `flex-direction: ${direction};` : ""}
        ${alignItems ? `align-items: ${alignItems};` : ""}
        ${alignContent ? `align-content: ${alignContent};` : ""}
      }
      @media only screen and (min-width: ${BREAKPOINTS.sm}px) {
        .item {
          flex-grow: ${layout.sm.grow};
          max-width: ${layout.sm.width};
          flex-basis: ${layout.sm.basis};
          display: ${layout.sm.display};
        }
      }
      @media only screen and (min-width: ${BREAKPOINTS.md}px) {
        .item {
          flex-grow: ${layout.md.grow};
          max-width: ${layout.md.width};
          flex-basis: ${layout.md.basis};
          display: ${layout.md.display};
        }
      }
      @media only screen and (min-width: ${BREAKPOINTS.lg}px) {
        .item {
          flex-grow: ${layout.lg.grow};
          max-width: ${layout.lg.width};
          flex-basis: ${layout.lg.basis};
          display: ${layout.lg.display};
        }
      }
      @media only screen and (min-width: ${BREAKPOINTS.xl}px) {
        .item {
          flex-grow: ${layout.xl.grow};
          max-width: ${layout.xl.width};
          flex-basis: ${layout.xl.basis};
          display: ${layout.xl.display};
        }
      }
    `;

    const vdom = (
      <>
        <style>{style}</style>
        <div class={cx("item")}>
          <slot></slot>
        </div>
      </>
    );

    webjsx.applyDiff(this.shadowRoot, vdom);
  }
}

customElements.define("g-grid", GeistGrid);
