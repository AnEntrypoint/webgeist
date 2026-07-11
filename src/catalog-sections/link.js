export default function renderLinkSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Hyperlinks between pages.</p>
      <div class="demo">
        <g-link href="#">HTTP is stateless, but not sessionless.</g-link>
      </div>
    </div>
    <div class="playground">
      <h3>Highlight</h3>
      <p>Distinguish links with different colors.</p>
      <div class="demo">
        <g-link href="#" color="var(--geist-success)">HTTP is stateless, but not sessionless.</g-link>
      </div>
    </div>
  `;
}
