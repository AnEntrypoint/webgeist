export default function renderBadgeSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Show number or text.</p>
      <div class="demo" style="display: flex; gap: 16px; position: relative;">
        <span style="position: relative; display: inline-block; padding: 4px;">1<g-badge count="1"></g-badge></span>
        <span style="position: relative; display: inline-block; padding: 4px;">50<g-badge count="50"></g-badge></span>
        <span style="position: relative; display: inline-block; padding: 4px;">100<g-badge count="100"></g-badge></span>
        <span style="position: relative; display: inline-block; padding: 4px;">2020<g-badge count="2020"></g-badge></span>
      </div>
    </div>
    <div class="playground">
      <h3>Type</h3>
      <p>Express state in different colors.</p>
      <div class="demo" style="display: flex; gap: 16px;">
        <span style="position: relative; display: inline-block; padding: 4px;">Success<g-badge type="success" count="1"></g-badge></span>
        <span style="position: relative; display: inline-block; padding: 4px;">Warning<g-badge type="warning" count="1"></g-badge></span>
        <span style="position: relative; display: inline-block; padding: 4px;">Error<g-badge type="error" count="1"></g-badge></span>
        <span style="position: relative; display: inline-block; padding: 4px;">Secondary<g-badge type="secondary" count="1"></g-badge></span>
      </div>
    </div>
    <div class="playground">
      <h3>Dot</h3>
      <p>Show a dot indicator and ignore content.</p>
      <div class="demo" style="display: flex; gap: 16px;">
        <span style="position: relative; display: inline-block; padding: 4px;">Notifications<g-badge dot type="error"></g-badge></span>
      </div>
    </div>
  `;
}
