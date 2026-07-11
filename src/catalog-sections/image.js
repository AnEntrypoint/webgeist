export default function renderImageSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <div class="demo">
        <g-image style="width: 280px; height: 160px;" src="/images/geist-banner.png" alt="geist banner"></g-image>
      </div>
    </div>
    <div class="playground">
      <h3>Skeleton</h3>
      <p>Image shows a skeleton animation while loading.</p>
      <div class="demo">
        <g-image style="width: 280px; height: 160px;" src="http://www.deelay.me/2000/https://geist-ui.dev/images/geist-banner.png" alt="delayed banner"></g-image>
      </div>
    </div>
  `;
}
