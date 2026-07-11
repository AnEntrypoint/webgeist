export default function renderCheckboxSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Change state with the checked attribute.</p>
      <div class="demo">
        <g-checkbox checked>Sydney</g-checkbox>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <div class="demo" style="display:flex;flex-direction:column;gap:8px;">
        <g-checkbox>Sydney</g-checkbox>
        <g-checkbox disabled checked>Bei Jing</g-checkbox>
      </div>
    </div>
    <div class="playground">
      <h3>Indeterminate</h3>
      <p>Show a mixed / indeterminate state.</p>
      <div class="demo">
        <g-checkbox indeterminate>Select all</g-checkbox>
      </div>
    </div>
    <div class="playground">
      <h3>Group</h3>
      <p>Manage a set of Checkbox.</p>
      <div class="demo">
        <g-checkbox-group id="checkbox-group-demo">
          <g-checkbox value="sydney" checked>Sydney</g-checkbox>
          <g-checkbox value="beijing">Bei Jing</g-checkbox>
          <g-checkbox value="london">London</g-checkbox>
          <g-checkbox value="tokyo">Tokyo</g-checkbox>
        </g-checkbox-group>
      </div>
    </div>
  `;
}

export function wire(container) {
  const group = container.querySelector("#checkbox-group-demo");
  if (group) {
    group.addEventListener("change", (e) => {
      console.log("checkbox-group change", e.detail);
    });
  }
}
