export default function renderNoteSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Show a piece of text or components.</p>
      <div class="demo">
        <g-note>This note details something important.</g-note>
      </div>
    </div>
    <div class="playground">
      <h3>Secondary</h3>
      <div class="demo">
        <g-note type="secondary">This note details something important.</g-note>
      </div>
    </div>
    <div class="playground">
      <h3>Status</h3>
      <div class="demo" style="display:flex; flex-direction:column; gap:12px;">
        <g-note type="success">This note details something important.</g-note>
        <g-note type="warning">This note details something important.</g-note>
        <g-note type="error">This note details something important.</g-note>
      </div>
    </div>
    <div class="playground">
      <h3>Custom label</h3>
      <div class="demo">
        <g-note label="custom">This note uses a custom label.</g-note>
      </div>
    </div>
  `;
}
