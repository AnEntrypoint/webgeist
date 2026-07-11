export default function renderDotSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo" style="display: flex; gap: 15px; align-items: center;">
        <g-dot></g-dot>
        <g-dot type="success"></g-dot>
        <g-dot type="warning"></g-dot>
        <g-dot type="error"></g-dot>
      </div>
    </div>
    <div class="playground">
      <h3>With text</h3>
      <div class="demo" style="display: flex; gap: 20px; align-items: center;">
        <span><g-dot></g-dot> Canceled</span>
        <span><g-dot type="success"></g-dot> Ready</span>
        <span><g-dot type="warning"></g-dot> Warning</span>
        <span><g-dot type="error"></g-dot> Error</span>
      </div>
    </div>
  `;
}
