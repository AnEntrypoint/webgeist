import { render } from "../render.js";

const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
  font-size: 14px;
}
.node {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  cursor: pointer;
  color: var(--geist-fg);
}
.node:hover {
  color: var(--geist-accent);
}
.toggle {
  display: inline-flex;
  width: 14px;
  height: 14px;
  align-items: center;
  justify-content: center;
  transition: transform .15s ease;
  color: var(--geist-secondary);
  flex-shrink: 0;
}
.toggle.expanded {
  transform: rotate(90deg);
}
.toggle.leaf {
  visibility: hidden;
}
.children {
  margin-left: 18px;
  border-left: 1px solid var(--geist-border);
  padding-left: 4px;
}
`;

export class GTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = [];
    this._expanded = new WeakSet();
  }

  connectedCallback() {
    this._render();
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = Array.isArray(value) ? value : [];
    this._render();
  }

  _toggleNode(node) {
    if (this._expanded.has(node)) {
      this._expanded.delete(node);
    } else {
      this._expanded.add(node);
    }
    this._render();
  }

  _selectNode(node) {
    this.dispatchEvent(
      new CustomEvent("select", {
        detail: node.name,
        bubbles: true,
        composed: true,
      })
    );
  }

  _renderNode(node) {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const expanded = this._expanded.has(node);

    return (
      <div class="tree-node">
        <div
          class="node"
          onclick={() => {
            if (hasChildren) this._toggleNode(node);
            this._selectNode(node);
          }}
        >
          <span class={`toggle${hasChildren ? "" : " leaf"}${expanded ? " expanded" : ""}`}>
            &#9656;
          </span>
          <span>{node.name}</span>
        </div>
        {hasChildren && expanded && (
          <div class="children">
            {node.children.map((child) => this._renderNode(child))}
          </div>
        )}
      </div>
    );
  }

  _render() {
    render(
      this.shadowRoot,
      <>
        <style>{STYLE}</style>
        <div class="tree">{this._data.map((node) => this._renderNode(node))}</div>
      </>
    );
  }
}

customElements.define("g-tree", GTree);
