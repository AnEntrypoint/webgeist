export default function renderLoadingSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo">
        <g-loading></g-loading>
      </div>
    </div>
    <div class="playground">
      <h3>With text</h3>
      <p>Customize text next to icon.</p>
      <div class="demo">
        <g-loading>Loading</g-loading>
      </div>
    </div>
    <div class="playground">
      <h3>Types</h3>
      <p>Loading indicators in different states.</p>
      <div class="demo" style="display:flex; flex-direction:column; gap:12px;">
        <g-loading type="success"></g-loading>
        <g-loading type="secondary"></g-loading>
        <g-loading type="warning"></g-loading>
        <g-loading type="error"></g-loading>
      </div>
    </div>
  `;
}
