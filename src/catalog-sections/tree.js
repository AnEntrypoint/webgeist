export default function renderTreeSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>All folders and files are sorted automatically.</p>
      <div class="demo">
        <g-tree id="tree-basic"></g-tree>
      </div>
    </div>
    <div class="playground">
      <h3>Imperative</h3>
      <p>Use the <code>data</code> property to show a more complex file tree.</p>
      <div class="demo">
        <g-tree id="tree-imperative"></g-tree>
      </div>
    </div>
    <div class="playground">
      <h3>Event</h3>
      <p>The selected node's name will be reported when a file is clicked.</p>
      <div class="demo">
        <g-tree id="tree-event"></g-tree>
        <p id="tree-event-output" style="font-size:13px;color:var(--geist-secondary);margin-top:8px;"></p>
      </div>
    </div>
  `;
}

export function wire(container) {
  const basic = container.querySelector("#tree-basic");
  if (basic) {
    basic.data = [
      { name: "package.json" },
      {
        name: "components",
        children: [
          { name: "layout.js" },
          {
            name: "footer",
            children: [
              { name: "footer.js" },
              { name: "footer-text.js" },
              { name: "footer-license.js" },
            ],
          },
          { name: "header.js" },
        ],
      },
      { name: "readme.md" },
    ];
  }

  const imperative = container.querySelector("#tree-imperative");
  if (imperative) {
    imperative.data = [
      {
        name: "bin",
        children: [{ name: "cs.js" }],
      },
      {
        name: "docs",
        children: [
          { name: "controllers.md" },
          { name: "es6.md" },
          { name: "production.md" },
          { name: "views.md" },
        ],
      },
    ];
  }

  const eventTree = container.querySelector("#tree-event");
  const output = container.querySelector("#tree-event-output");
  if (eventTree) {
    eventTree.data = [
      {
        name: "components",
        children: [
          { name: "layout.js" },
          {
            name: "footer",
            children: [
              { name: "footer.js" },
              { name: "footer-text.js" },
              { name: "footer-license.js" },
            ],
          },
        ],
      },
      { name: "package.json" },
      { name: "readme.md" },
    ];
    eventTree.addEventListener("select", (e) => {
      if (output) output.textContent = e.detail;
    });
  }
}
