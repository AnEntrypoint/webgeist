export default function renderProgressSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo">
        <g-progress value="50"></g-progress>
      </div>
    </div>
    <div class="playground">
      <h3>Indeterminate</h3>
      <p>Omit <code>value</code> to show an indeterminate progress bar.</p>
      <div class="demo">
        <g-progress></g-progress>
      </div>
    </div>
    <div class="playground">
      <h3>Type</h3>
      <p>We prepared some different styles in advance.</p>
      <div class="demo" style="display:flex; flex-direction:column; gap:12px;">
        <g-progress type="secondary" value="10"></g-progress>
        <g-progress type="success" value="45"></g-progress>
        <g-progress type="warning" value="100"></g-progress>
        <g-progress type="error" value="21"></g-progress>
      </div>
    </div>
  `;
}
