export default function renderAutoCompleteSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Basic usage, add autocomplete list for all inputs.</p>
      <div class="demo">
        <g-auto-complete id="ac-basic" placeholder="Enter here"></g-auto-complete>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Disable all.</p>
      <div class="demo">
        <g-auto-complete disabled value="London"></g-auto-complete>
      </div>
    </div>
    <div class="playground">
      <h3>Clearable</h3>
      <p>Add a clear button in the input box (options set programmatically).</p>
      <div class="demo">
        <g-auto-complete id="ac-clearable" placeholder="Enter here"></g-auto-complete>
      </div>
    </div>
  `;
}

export function wire(container) {
  const cities = ["London", "Sydney", "Shanghai"];
  const basic = container.querySelector("#ac-basic");
  if (basic) basic.options = cities;
  const clearable = container.querySelector("#ac-clearable");
  if (clearable) clearable.options = cities;
}
