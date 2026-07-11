export default function renderTextareaSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Basic usage.</p>
      <div class="demo">
        <g-textarea placeholder="Please enter a description."></g-textarea>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Disable interactive textarea.</p>
      <div class="demo">
        <g-textarea style="width:100%" disabled placeholder="Now is the optimal workflow for frontend teams."></g-textarea>
      </div>
    </div>
    <div class="playground">
      <h3>Type</h3>
      <p>Differentiate states by color.</p>
      <div class="demo">
        <g-textarea status="success" value="Success"></g-textarea>
        <g-textarea status="secondary" value="Secondary"></g-textarea>
        <g-textarea status="warning" value="Warning"></g-textarea>
        <g-textarea status="error" value="Error"></g-textarea>
      </div>
    </div>
    <div class="playground">
      <h3>Resize</h3>
      <p>Control the CSS resize behavior.</p>
      <div class="demo">
        <g-textarea resize="none" placeholder="No resize"></g-textarea>
        <g-textarea resize="horizontal" placeholder="Horizontal resize"></g-textarea>
      </div>
    </div>
  `;
}
