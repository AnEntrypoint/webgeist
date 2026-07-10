import { render } from "../render.js";

export class GImage extends HTMLElement {
  static get observedAttributes() {
    return ["src", "alt"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._loaded = false;
    this._error = false;
  }

  connectedCallback() {
    this._setupObserver();
    this._render();
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  attributeChangedCallback(name) {
    if (name === "src") {
      this._loaded = false;
      this._error = false;
    }
    this._render();
  }

  get src() {
    return this.getAttribute("src") || "";
  }

  get alt() {
    return this.getAttribute("alt") || "";
  }

  _setupObserver() {
    if (typeof IntersectionObserver === "undefined") {
      this._inView = true;
      return;
    }
    this._inView = false;
    this._observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this._inView = true;
          this._render();
          if (this._observer) this._observer.disconnect();
        }
      }
    });
    this._observer.observe(this);
  }

  _onLoad() {
    this._loaded = true;
    this._error = false;
    this._render();
  }

  _onError() {
    this._error = true;
    this._loaded = false;
    this._render();
  }

  _render() {
    const loaded = this._loaded;
    const error = this._error;

    const style = `
      :host {
        display: inline-block;
        font-family: var(--geist-font);
        line-height: 0;
      }
      .wrap {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: var(--geist-radius);
        overflow: hidden;
        background: ${error ? "var(--geist-border)" : "var(--geist-border)"};
      }
      img {
        display: block;
        max-width: 100%;
        opacity: ${loaded ? 1 : 0};
        transition: opacity .3s ease;
      }
      .skeleton {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, var(--geist-border) 25%, rgba(0,0,0,.04) 37%, var(--geist-border) 63%);
        background-size: 400% 100%;
        animation: shimmer 1.4s ease infinite;
        display: ${loaded || error ? "none" : "block"};
      }
      @keyframes shimmer {
        0% { background-position: 100% 50%; }
        100% { background-position: 0 50%; }
      }
      .broken {
        display: ${error ? "flex" : "none"};
        position: absolute;
        inset: 0;
        align-items: center;
        justify-content: center;
        color: var(--geist-secondary);
        font-size: 12px;
        background: var(--geist-border);
      }
    `;

    render(
      this.shadowRoot,
      <>
        <style>{style}</style>
        <span class="wrap">
          <span class="skeleton"></span>
          <span class="broken">broken image</span>
          {this._inView && (
            <img
              src={this.src}
              alt={this.alt}
              loading="lazy"
              onload={() => this._onLoad()}
              onerror={() => this._onError()}
            />
          )}
        </span>
      </>
    );
  }
}

customElements.define("g-image", GImage);
