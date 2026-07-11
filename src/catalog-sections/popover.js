export default function renderPopoverSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>The floating box popped by clicking the trigger.</p>
      <div class="demo">
        <g-popover>
          <span slot="trigger">Menu</span>
          <div slot="content" style="padding:0 10px;">
            <g-link href="#">A hyperlink</g-link><br/>
            <g-link color href="#">External link</g-link>
          </div>
        </g-popover>
      </div>
    </div>
    <div class="playground">
      <h3>Placement</h3>
      <p>Position the popover relative to the target.</p>
      <div class="demo" style="display:flex;gap:24px;">
        <g-popover placement="top">
          <span slot="trigger">Top</span>
          <div slot="content" style="padding:0 10px;">Content on top</div>
        </g-popover>
        <g-popover placement="bottom">
          <span slot="trigger">Bottom</span>
          <div slot="content" style="padding:0 10px;">Content on bottom</div>
        </g-popover>
        <g-popover placement="left">
          <span slot="trigger">Left</span>
          <div slot="content" style="padding:0 10px;">Content on left</div>
        </g-popover>
        <g-popover placement="right">
          <span slot="trigger">Right</span>
          <div slot="content" style="padding:0 10px;">Content on right</div>
        </g-popover>
      </div>
    </div>
    <div class="playground">
      <h3>Close Manual</h3>
      <p>You can control when to close the pop-up box.</p>
      <div class="demo">
        <g-popover id="popover-manual">
          <span slot="trigger">Menu</span>
          <div slot="content" style="padding:0 10px;">
            <span id="popover-manual-close" style="cursor:pointer;">Click to close</span>
          </div>
        </g-popover>
      </div>
    </div>
  `;
}

export function wire(container) {
  const popover = container.querySelector("#popover-manual");
  const closeBtn = container.querySelector("#popover-manual-close");
  if (popover && closeBtn) {
    closeBtn.addEventListener("click", () => popover.close());
  }
}
