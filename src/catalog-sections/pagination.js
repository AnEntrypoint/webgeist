export default function renderPaginationSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Navigation and identification between multiple pages.</p>
      <div class="demo">
        <g-pagination count="20" page="3"></g-pagination>
      </div>
    </div>
    <div class="playground">
      <h3>Limit</h3>
      <p>The maximum number of pages that can be displayed.</p>
      <div class="demo" style="display:flex;flex-direction:column;gap:12px;">
        <g-pagination count="10" limit="10"></g-pagination>
        <g-pagination count="5"></g-pagination>
        <g-pagination count="10" page="6" limit="5"></g-pagination>
        <g-pagination count="10" page="6"></g-pagination>
        <g-pagination count="30" page="6" limit="10"></g-pagination>
      </div>
    </div>
  `;
}
