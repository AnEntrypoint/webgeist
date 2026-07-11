export default function renderModalSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Use <code>.show()</code> / <code>.hide()</code> to control whether the Modal is displayed.</p>
      <div class="demo">
        <g-button id="modal-basic-open">Show Modal</g-button>
        <g-modal id="modal-basic">
          <span slot="header">
            <h3 style="margin:0;">Modal</h3>
            <p style="margin:4px 0 0; opacity:.7;">This is a modal</p>
          </span>
          <div slot="content">
            <p>Some content contained within the modal.</p>
          </div>
          <span slot="footer">
            <g-button id="modal-basic-cancel">Cancel</g-button>
            <g-button id="modal-basic-submit" type="success">Submit</g-button>
          </span>
        </g-modal>
      </div>
    </div>
    <div class="playground">
      <h3>Without Actions</h3>
      <p>Hide all action buttons.</p>
      <div class="demo">
        <g-button id="modal-noaction-open">Show Modal</g-button>
        <g-modal id="modal-noaction">
          <span slot="header">
            <h3 style="margin:0;">Modal</h3>
            <p style="margin:4px 0 0; opacity:.7;">This is a modal</p>
          </span>
          <div slot="content">
            <p>Some content contained within the modal.</p>
          </div>
        </g-modal>
      </div>
    </div>
    <div class="playground">
      <h3>Disable Action</h3>
      <p>Disable one of the buttons.</p>
      <div class="demo">
        <g-button id="modal-disable-open">Show Modal</g-button>
        <g-modal id="modal-disable">
          <span slot="header">
            <h3 style="margin:0;">Modal</h3>
            <p style="margin:4px 0 0; opacity:.7;">This is a modal</p>
          </span>
          <div slot="content">
            <p>Some content contained within the modal.</p>
          </div>
          <span slot="footer">
            <g-button id="modal-disable-cancel">Cancel</g-button>
            <g-button disabled>Submit</g-button>
          </span>
        </g-modal>
      </div>
    </div>
    <div class="playground">
      <h3>Loading</h3>
      <div class="demo">
        <g-button id="modal-loading-open">Show Modal</g-button>
        <g-modal id="modal-loading">
          <span slot="header">
            <h3 style="margin:0;">Modal</h3>
            <p style="margin:4px 0 0; opacity:.7;">This is a modal</p>
          </span>
          <div slot="content">
            <p>Some content contained within the modal.</p>
          </div>
          <span slot="footer">
            <g-button id="modal-loading-cancel">Cancel</g-button>
            <g-button loading>Submit</g-button>
          </span>
        </g-modal>
      </div>
    </div>
  `;
}

export function wire(container) {
  const pairs = [
    ["modal-basic-open", "modal-basic"],
    ["modal-noaction-open", "modal-noaction"],
    ["modal-disable-open", "modal-disable"],
    ["modal-loading-open", "modal-loading"],
  ];
  for (const [openId, modalId] of pairs) {
    const openBtn = container.querySelector(`#${openId}`);
    const modal = container.querySelector(`#${modalId}`);
    if (openBtn && modal) openBtn.addEventListener("click", () => modal.show());
  }

  const closers = [
    ["modal-basic-cancel", "modal-basic"],
    ["modal-basic-submit", "modal-basic"],
    ["modal-disable-cancel", "modal-disable"],
    ["modal-loading-cancel", "modal-loading"],
  ];
  for (const [btnId, modalId] of closers) {
    const btn = container.querySelector(`#${btnId}`);
    const modal = container.querySelector(`#${modalId}`);
    if (btn && modal) btn.addEventListener("click", () => modal.hide());
  }
}
