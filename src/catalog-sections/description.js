export default function renderDescriptionSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Description component contains title and content.</p>
      <div class="demo">
        <g-description title="Section Title" content="Data about this section."></g-description>
      </div>
    </div>
    <div class="playground">
      <h3>With Component</h3>
      <p>Use in combination with other components.</p>
      <div class="demo">
        <g-description title="Section Title">
          <span slot="content"><g-code>code</g-code> about this section.</span>
        </g-description>
      </div>
    </div>
  `;
}
