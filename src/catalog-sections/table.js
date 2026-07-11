export default function renderTableSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Display formatted data in rows and columns.</p>
      <div class="demo">
        <g-table id="table-basic"></g-table>
      </div>
    </div>
    <div class="playground">
      <h3>Striped</h3>
      <p>Add zebra striping to table rows.</p>
      <div class="demo">
        <g-table id="table-striped" striped></g-table>
      </div>
    </div>
  `;
}

export function wire(container) {
  const basicColumns = [
    { key: "property", label: "property" },
    { key: "description", label: "description" },
    { key: "type", label: "type" },
    { key: "default", label: "default" },
  ];
  const basicData = [
    { property: "type", description: "Content type", type: "secondary | warning", default: "-" },
    { property: "Component", description: "DOM element to use", type: "string", default: "-" },
    { property: "bold", description: "Bold style", type: "boolean", default: "true" },
  ];

  const basic = container.querySelector("#table-basic");
  if (basic) {
    basic.columns = basicColumns;
    basic.data = basicData;
  }

  const striped = container.querySelector("#table-striped");
  if (striped) {
    striped.columns = basicColumns;
    striped.data = basicData;
  }
}
