import { render } from "../render.js";

const STYLE = `
:host {
  display: block;
  font-family: var(--geist-font);
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th, td {
  text-align: left;
  padding: var(--geist-gap-sm) var(--geist-gap);
  border-bottom: 1px solid var(--geist-border);
}
th {
  color: var(--geist-secondary);
  font-weight: 500;
}
td {
  color: var(--geist-fg);
}
:host([striped]) tbody tr:nth-child(odd) {
  background: var(--geist-border);
}
`;

export class GTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = [];
    this._columns = [];
  }

  static get observedAttributes() {
    return ["striped"];
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = Array.isArray(value) ? value : [];
    this._render();
  }

  get columns() {
    return this._columns;
  }

  set columns(value) {
    this._columns = Array.isArray(value) ? value : [];
    this._render();
  }

  _render() {
    const columns = this._columns;
    const data = this._data;

    render(
      this.shadowRoot,
      <>
        <style>{STYLE}</style>
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr>
                {columns.map((col) => (
                  <td>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

customElements.define("g-table", GTable);
