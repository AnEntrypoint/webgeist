export default function renderButtonGroupSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo">
        <g-button-group>
          <g-button>One</g-button>
          <g-button>Two</g-button>
          <g-button>Three</g-button>
        </g-button-group>
      </div>
    </div>
    <div class="playground">
      <h3>Variant</h3>
      <p>Set the type of all buttons in the group.</p>
      <div class="demo" style="display:flex;gap:16px;flex-wrap:wrap;">
        <g-button-group>
          <g-button type="success">One</g-button>
          <g-button type="success">Two</g-button>
          <g-button type="success">Three</g-button>
        </g-button-group>
        <g-button-group>
          <g-button type="warning" ghost>Action1</g-button>
          <g-button type="warning" ghost>Action2</g-button>
        </g-button-group>
      </div>
    </div>
    <div class="playground">
      <h3>Vertical</h3>
      <div class="demo">
        <g-button-group vertical>
          <g-button>One</g-button>
          <g-button>Two</g-button>
          <g-button>Three</g-button>
          <g-button>Four</g-button>
        </g-button-group>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Disable all buttons in the group.</p>
      <div class="demo">
        <g-button-group>
          <g-button disabled>One</g-button>
          <g-button disabled>Two</g-button>
          <g-button disabled>Three</g-button>
        </g-button-group>
      </div>
    </div>
  `;
}
