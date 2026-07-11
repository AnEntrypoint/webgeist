export default function renderRatingSection() {
  return `
    <div class="playground">
      <h3>Default</h3>
      <p>A default rating component with an initial value.</p>
      <div class="demo">
        <g-rating value="1"></g-rating>
      </div>
    </div>
    <div class="playground">
      <h3>Types</h3>
      <p>Pass the attribute <code>type</code> to the Rating component.</p>
      <div class="demo" style="display:flex; gap:24px;">
        <g-rating type="success"></g-rating>
        <g-rating type="error"></g-rating>
        <g-rating type="warning"></g-rating>
      </div>
    </div>
    <div class="playground">
      <h3>Custom Amount</h3>
      <p>Customize the amount of stars.</p>
      <div class="demo" style="display:flex; flex-direction:column; gap:8px;">
        <g-rating count="2"></g-rating>
        <g-rating value="3" count="6"></g-rating>
        <g-rating value="4" count="8"></g-rating>
      </div>
    </div>
    <div class="playground">
      <h3>Readonly</h3>
      <div class="demo">
        <g-rating value="4" readonly></g-rating>
      </div>
    </div>
  `;
}
