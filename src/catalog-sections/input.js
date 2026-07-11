export default function renderInputSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Basic input field.</p>
      <div class="demo">
        <g-input placeholder="Geist UI"></g-input>
      </div>
    </div>
    <div class="playground">
      <h3>Set width</h3>
      <p>Specify width or other styles.</p>
      <div class="demo">
        <g-input placeholder="Geist UI" style="width:100%"></g-input>
      </div>
    </div>
    <div class="playground">
      <h3>Unwritable</h3>
      <p>Disable interactive inputs.</p>
      <div class="demo">
        <g-input disabled placeholder="Disabled"></g-input>
        <g-input value="readOnly"></g-input>
      </div>
    </div>
    <div class="playground">
      <h3>Inline label</h3>
      <p>Show a short label in the line.</p>
      <div class="demo">
        <g-input label="username" placeholder="Geist UI"></g-input>
      </div>
    </div>
    <div class="playground">
      <h3>Type</h3>
      <p>Differentiate states by color.</p>
      <div class="demo">
        <g-input status="secondary" value="Geist UI"></g-input>
        <g-input status="success" value="Geist UI"></g-input>
        <g-input status="warning" value="Geist UI"></g-input>
        <g-input status="error" value="Geist UI"></g-input>
      </div>
    </div>
    <div class="playground">
      <h3>Clearable</h3>
      <p>Add a clear button in the input box.</p>
      <div class="demo">
        <g-input clearable value="Geist UI" placeholder="Geist UI"></g-input>
      </div>
    </div>
  `;
}
