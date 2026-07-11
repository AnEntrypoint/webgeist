export default function renderTagSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo">
        <g-tag>Status: Unstable</g-tag>
      </div>
    </div>
    <div class="playground">
      <h3>Types</h3>
      <p>Show different states with colors.</p>
      <div class="demo" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <g-tag type="success">Success</g-tag>
        <g-tag type="warning">Warning</g-tag>
        <g-tag type="error">Error</g-tag>
        <g-tag type="secondary">Secondary</g-tag>
      </div>
    </div>
    <div class="playground">
      <h3>Invert</h3>
      <p>Invert color and background.</p>
      <div class="demo" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <g-tag type="default" invert>Default</g-tag>
        <g-tag type="success" invert>Success</g-tag>
        <g-tag type="warning" invert>Warning</g-tag>
        <g-tag type="error" invert>Error</g-tag>
        <g-tag type="secondary" invert>Secondary</g-tag>
      </div>
    </div>
    <div class="playground">
      <h3>Closable</h3>
      <p>Add a close button that dispatches a close event.</p>
      <div class="demo" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <g-tag closable>Closable</g-tag>
      </div>
    </div>
  `;
}
