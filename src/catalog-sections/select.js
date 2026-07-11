export default function renderSelectSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Basic usage.</p>
      <div class="demo">
        <g-select placeholder="Choose one" id="select-basic">
          <g-select-option value="1">Option 1</g-select-option>
          <g-select-option value="2">Option 2</g-select-option>
        </g-select>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Disable all options.</p>
      <div class="demo">
        <g-select placeholder="Choose one" disabled>
          <g-select-option value="1">Option 1</g-select-option>
          <g-select-option value="2">Option 2</g-select-option>
        </g-select>
      </div>
    </div>
    <div class="playground">
      <h3>Initial value</h3>
      <p>Preselect a value.</p>
      <div class="demo">
        <g-select placeholder="Choose one" value="1">
          <g-select-option value="1">Option 1</g-select-option>
          <g-select-option value="2">Option 2</g-select-option>
        </g-select>
      </div>
    </div>
  `;
}

export function wire(container) {
  const select = container.querySelector("#select-basic");
  if (select) {
    select.addEventListener("change", (e) => {
      console.log("select changed:", e.detail);
    });
  }
}
