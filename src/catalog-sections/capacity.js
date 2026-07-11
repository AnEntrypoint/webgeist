export default function renderCapacitySection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo" style="display: flex; gap: 24px; align-items: center;">
        <g-capacity value="15"></g-capacity>
        <g-capacity value="45"></g-capacity>
        <g-capacity value="95"></g-capacity>
      </div>
    </div>
  `;
}
