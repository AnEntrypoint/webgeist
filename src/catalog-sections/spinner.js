export default function renderSpinnerSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo">
        <g-spinner></g-spinner>
      </div>
    </div>
    <div class="playground">
      <h3>Sizes</h3>
      <p>Customize spinner size.</p>
      <div class="demo" style="display:flex; align-items:center; gap:16px;">
        <g-spinner size="small"></g-spinner>
        <g-spinner size="medium"></g-spinner>
        <g-spinner size="large"></g-spinner>
      </div>
    </div>
  `;
}
