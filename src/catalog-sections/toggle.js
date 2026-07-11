export default function renderToggleSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Displays a boolean value.</p>
      <div class="demo">
        <g-toggle></g-toggle>
        <g-toggle checked></g-toggle>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Disable toggle interaction.</p>
      <div class="demo">
        <g-toggle disabled></g-toggle>
        <g-toggle checked disabled></g-toggle>
      </div>
    </div>
    <div class="playground">
      <h3>Get change</h3>
      <p>Capture change events.</p>
      <div class="demo">
        <g-toggle id="toggle-get-change"></g-toggle>
      </div>
    </div>
  `;
}

export function wire(container) {
  const toggle = container.querySelector("#toggle-get-change");
  if (toggle) {
    toggle.addEventListener("change", (e) => {
      console.log("toggle changed:", e.detail);
    });
  }
}
