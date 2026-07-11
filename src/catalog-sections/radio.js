export default function renderRadioSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>A single radio option.</p>
      <div class="demo">
        <g-radio value="1">Option 1</g-radio>
      </div>
    </div>
    <div class="playground">
      <h3>Group</h3>
      <p>A group of radio components.</p>
      <div class="demo">
        <g-radio-group value="1" id="radio-group-basic">
          <g-radio value="1">Option 1</g-radio>
          <g-radio value="2">Option 2</g-radio>
        </g-radio-group>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Disable all radios.</p>
      <div class="demo">
        <g-radio-group value="1" disabled>
          <g-radio value="1" disabled>Option 1</g-radio>
          <g-radio value="2" disabled>Option 2</g-radio>
        </g-radio-group>
      </div>
    </div>
  `;
}

export function wire(container) {
  const group = container.querySelector("#radio-group-basic");
  if (group) {
    group.addEventListener("change", (e) => {
      console.log("radio group changed:", e.detail);
    });
  }
}
