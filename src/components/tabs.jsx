import { render } from "../render.js";
import { createTabsState } from "../utils/tabsState.js";
import { uid } from "../utils/shared.js";

const TABS_STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
}
.tab-list {
  position: relative;
  display: flex;
  gap: var(--geist-gap);
  border-bottom: 1px solid var(--geist-border);
}
.indicator {
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: var(--geist-fg);
  transition: left .2s ease, width .2s ease;
}
.panels {
  padding-top: var(--geist-gap);
}
`;

export class GTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._id = uid("g-tabs");
    this._state = createTabsState(null);
  }

  connectedCallback() {
    this._unsub = this._state.subscribe(() => this._render());
    this._render();
    this._slotEl = this.shadowRoot.querySelector("slot");
    if (this._slotEl) {
      this._slotEl.addEventListener("slotchange", () => this._onSlotChange());
    }
    this._onSlotChange();
  }

  disconnectedCallback() {
    if (this._unsub) this._unsub();
  }

  get _tabEls() {
    return Array.from(this.querySelectorAll("g-tab"));
  }

  _onSlotChange() {
    const tabs = this._tabEls;
    if (tabs.length === 0) return;
    if (this._state.get() === null || !tabs.some((t) => t.getAttribute("value") === this._state.get())) {
      const first = tabs[0].getAttribute("value") || tabs[0].getAttribute("label") || "0";
      this._state.set(first);
    } else {
      this._render();
    }
  }

  _select(value) {
    this._state.set(value);
    this.dispatchEvent(
      new CustomEvent("change", { detail: value, bubbles: true, composed: true })
    );
  }

  _render() {
    const tabs = this._tabEls;
    const active = this._state.get();

    tabs.forEach((tab) => {
      const value = tab.getAttribute("value") || tab.getAttribute("label");
      tab.toggleAttribute("active", value === active);
    });

    const activeIndex = Math.max(
      0,
      tabs.findIndex((t) => (t.getAttribute("value") || t.getAttribute("label")) === active)
    );

    render(
      this.shadowRoot,
      <>
        <style>{TABS_STYLE}</style>
        <div class="tab-list">
          {tabs.map((tab, i) => {
            const value = tab.getAttribute("value") || tab.getAttribute("label");
            return (
              <g-tab-button
                data-index={i}
                data-active={value === active ? "true" : "false"}
                onclick={() => this._select(value)}
              >
                {tab.getAttribute("label")}
              </g-tab-button>
            );
          })}
          <div
            class="indicator"
            style={`left:calc(${activeIndex} * (100% / ${Math.max(tabs.length, 1)})); width:calc(100% / ${Math.max(tabs.length, 1)})`}
          ></div>
        </div>
        <div class="panels">
          <slot></slot>
        </div>
      </>
    );
  }
}

const TAB_BUTTON_STYLE = `
:host {
  display: inline-flex;
  padding: var(--geist-gap-sm) 0;
  cursor: pointer;
  color: var(--geist-secondary);
  font-size: 14px;
  user-select: none;
}
:host([data-active="true"]) {
  color: var(--geist-fg);
  font-weight: 500;
}
`;

class GTabButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(
      this.shadowRoot,
      <>
        <style>{TAB_BUTTON_STYLE}</style>
        <slot></slot>
      </>
    );
  }
}

const TAB_STYLE = `
:host {
  display: none;
}
:host([active]) {
  display: block;
}
`;

export class GTab extends HTMLElement {
  static get observedAttributes() {
    return ["active"];
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
    render(
      this.shadowRoot,
      <>
        <style>{TAB_STYLE}</style>
        <slot></slot>
      </>
    );
  }
}

customElements.define("g-tab-button", GTabButton);
customElements.define("g-tabs", GTabs);
customElements.define("g-tab", GTab);
