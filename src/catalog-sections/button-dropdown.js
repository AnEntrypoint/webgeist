export default function renderButtonDropdownSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Display related but alternate actions for a button.</p>
      <div class="demo">
        <g-button-dropdown>
          <span slot="label">Default Action</span>
          <div>Secondary Action</div>
          <div>Tertiary Action</div>
        </g-button-dropdown>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Disable all buttons.</p>
      <div class="demo">
        <g-button-dropdown disabled>
          <span slot="label">Default Action</span>
          <div>Secondary Action</div>
          <div>Tertiary Action</div>
        </g-button-dropdown>
      </div>
    </div>
  `;
}
