export default function renderKeyboardSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo">
        <g-keyboard>f</g-keyboard>
      </div>
    </div>
    <div class="playground">
      <h3>Combination</h3>
      <p>Combine keys to represent a shortcut.</p>
      <div class="demo" style="display: flex; gap: 10px;">
        <g-keyboard>f</g-keyboard>
        <g-keyboard>e</g-keyboard>
        <g-keyboard>b</g-keyboard>
      </div>
    </div>
  `;
}
