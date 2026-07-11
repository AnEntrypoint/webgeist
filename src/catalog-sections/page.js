export default function renderPageSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>The content will be displayed in the center.</p>
      <div class="demo" style="border:1px solid var(--geist-border);border-radius:8px;overflow:hidden;">
        <g-page>
          <h2>Hello, Everyone.</h2>
          <p>This is a simulated page.</p>
        </g-page>
      </div>
    </div>
    <div class="playground">
      <h3>Content</h3>
      <p>Add Header and Footer for better layout.</p>
      <div class="demo" style="border:1px solid var(--geist-border);border-radius:8px;overflow:hidden;">
        <g-page>
          <g-page-header slot="header">
            <h2>Header</h2>
          </g-page-header>
          <g-page-content slot="content">
            <h2>Hello, Everyone.</h2>
            <p>This is a simulated page.</p>
          </g-page-content>
          <g-page-footer slot="footer">
            <h2>Footer</h2>
          </g-page-footer>
        </g-page>
      </div>
    </div>
  `;
}
