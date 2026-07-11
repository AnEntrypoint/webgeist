export default function renderBreadcrumbsSection() {
  return `
    <div class="playground">
      <h3>Breadcrumbs</h3>
      <p>Show where users are in the application.</p>
      <div class="demo">
        <g-breadcrumbs>
          <a href="#">Home</a>
          <a href="#">Catalog</a>
          <span>Page</span>
        </g-breadcrumbs>
      </div>
    </div>
    <div class="playground">
      <h3>Icons</h3>
      <p>Show more information alongside labels.</p>
      <div class="demo">
        <g-breadcrumbs>
          <a href="#">Home</a>
          <a href="#">Inbox</a>
          <span>Page</span>
        </g-breadcrumbs>
      </div>
    </div>
  `;
}
