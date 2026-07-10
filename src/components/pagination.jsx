import { render } from "../render.js";

const STYLE = `
:host {
  display: inline-block;
  font-family: var(--geist-font);
}
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;
}
button {
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  border-radius: var(--geist-radius);
  border: 1px solid var(--geist-border);
  background: var(--geist-bg);
  color: var(--geist-fg);
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
button:hover:not(:disabled) {
  background: var(--geist-border);
}
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
button.active {
  background: var(--geist-fg);
  color: var(--geist-bg);
  border-color: var(--geist-fg);
}
.ellipsis {
  min-width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--geist-secondary);
}
`;

function buildRange(count, page, limit) {
  if (count <= limit) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  const pages = new Set([1, count, page]);
  const side = Math.max(1, Math.floor((limit - 3) / 2));
  for (let i = 1; i <= side; i++) {
    pages.add(page - i);
    pages.add(page + i);
  }

  const sorted = [...pages].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);

  const result = [];
  let prev = null;
  for (const p of sorted) {
    if (prev !== null && p - prev > 1) result.push("...");
    result.push(p);
    prev = p;
  }
  return result;
}

export class GPagination extends HTMLElement {
  static get observedAttributes() {
    return ["count", "page", "limit"];
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

  get count() {
    return Number(this.getAttribute("count")) || 1;
  }

  get page() {
    return Number(this.getAttribute("page")) || 1;
  }

  get limit() {
    return Number(this.getAttribute("limit")) || 7;
  }

  _goTo(page) {
    if (page < 1 || page > this.count || page === this.page) return;
    this.setAttribute("page", String(page));
    this.dispatchEvent(
      new CustomEvent("change", { detail: page, bubbles: true, composed: true })
    );
  }

  _render() {
    const count = this.count;
    const page = this.page;
    const limit = this.limit;
    const range = buildRange(count, page, limit);

    render(
      this.shadowRoot,
      <>
        <style>{STYLE}</style>
        <div class="pagination">
          <button
            disabled={page <= 1}
            onclick={() => this._goTo(page - 1)}
            aria-label="Previous page"
          >
            {"<"}
          </button>
          {range.map((p) =>
            p === "..." ? (
              <span class="ellipsis">...</span>
            ) : (
              <button
                class={p === page ? "active" : ""}
                onclick={() => this._goTo(p)}
              >
                {p}
              </button>
            )
          )}
          <button
            disabled={page >= count}
            onclick={() => this._goTo(page + 1)}
            aria-label="Next page"
          >
            {">"}
          </button>
        </div>
      </>
    );
  }
}

customElements.define("g-pagination", GPagination);
