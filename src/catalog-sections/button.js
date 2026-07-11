export default function renderButtonSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>The basic Button contains an animation effect.</p>
      <div class="demo">
        <g-button>Action</g-button>
      </div>
    </div>
    <div class="playground">
      <h3>Loading</h3>
      <p>Show running status.</p>
      <div class="demo">
        <g-button loading>Action</g-button>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Do not respond to any action.</p>
      <div class="demo">
        <g-button disabled>Action</g-button>
      </div>
    </div>
    <div class="playground">
      <h3>Types</h3>
      <p>Different state.</p>
      <div class="demo" style="display:flex;gap:12px;flex-wrap:wrap;">
        <g-button type="secondary">Secondary</g-button>
        <g-button type="success">Success</g-button>
        <g-button type="warning">Warning</g-button>
        <g-button type="error">Error</g-button>
      </div>
    </div>
    <div class="playground">
      <h3>Ghost</h3>
      <p>The opposite color.</p>
      <div class="demo" style="display:flex;gap:12px;flex-wrap:wrap;">
        <g-button type="secondary" ghost>Secondary</g-button>
        <g-button type="success" ghost>Success</g-button>
        <g-button type="warning" ghost>Warning</g-button>
        <g-button type="error" ghost>Error</g-button>
      </div>
    </div>
    <div class="playground">
      <h3>Sizes</h3>
      <p>Buttons of different sizes.</p>
      <div class="demo" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <g-button size="mini">Mini</g-button>
        <g-button size="small">Small</g-button>
        <g-button size="medium">Medium</g-button>
        <g-button size="large">Large</g-button>
      </div>
    </div>
  `;
}
