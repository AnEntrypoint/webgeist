import { render } from "../render.js";

const STYLE = `
  :host { display: inline-block; width: 100%; font-family: var(--geist-font); }
  .wrapper { position: relative; padding-top: 20px; }
  input[type="range"] {
    -webkit-appearance: none; appearance: none; width: 100%; height: 4px;
    border-radius: 2px; background: var(--geist-border); outline: none; margin: 0;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; width: 16px; height: 16px;
    border-radius: 50%; background: var(--geist-accent); cursor: pointer;
    border: 2px solid var(--geist-bg); box-shadow: var(--geist-shadow);
  }
  input[type="range"]::-moz-range-thumb {
    width: 16px; height: 16px; border-radius: 50%; background: var(--geist-accent);
    cursor: pointer; border: 2px solid var(--geist-bg);
  }
  .tooltip {
    position: absolute; top: -4px; transform: translateX(-50%);
    background: var(--geist-fg); color: var(--geist-bg); font-size: 12px;
    padding: 2px 6px; border-radius: var(--geist-radius); display: none; white-space: nowrap;
  }
  .tooltip.show { display: block; }
`;

export class GSlider extends HTMLElement {
  static get observedAttributes() {
    return ["min", "max", "step", "value", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._dragging = false;
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  get min() {
    return this.hasAttribute("min") ? Number(this.getAttribute("min")) : 0;
  }
  get max() {
    return this.hasAttribute("max") ? Number(this.getAttribute("max")) : 100;
  }
  get step() {
    return this.hasAttribute("step") ? Number(this.getAttribute("step")) : 1;
  }
  get value() {
    return this.hasAttribute("value") ? Number(this.getAttribute("value")) : this.min;
  }
  set value(v) {
    this.setAttribute("value", v);
  }

  _percent() {
    const { min, max, value } = this;
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }

  _onInput(e) {
    const v = Number(e.target.value);
    this.setAttribute("value", v);
    this.dispatchEvent(new CustomEvent("input", { detail: { value: v }, bubbles: true }));
  }

  _onChange(e) {
    const v = Number(e.target.value);
    this.setAttribute("value", v);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: v }, bubbles: true }));
  }

  _render() {
    const percent = this._percent();
    const vdom = (
      <div class="wrapper">
        <style>{STYLE}</style>
        <div class={"tooltip" + (this._dragging ? " show" : "")} style={`left: ${percent}%`}>
          {this.value}
        </div>
        <input
          type="range"
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          disabled={this.hasAttribute("disabled")}
          oninput={(e) => {
            this._dragging = true;
            this._onInput(e);
          }}
          onchange={(e) => this._onChange(e)}
          onmouseup={() => {
            this._dragging = false;
            this._render();
          }}
          ontouchend={() => {
            this._dragging = false;
            this._render();
          }}
        />
      </div>
    );
    render(this.shadowRoot, vdom);
  }
}

customElements.define("g-slider", GSlider);
