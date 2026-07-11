export default function renderDrawerSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Basic usage.</p>
      <div class="demo">
        <g-button id="drawer-basic-open">Show Drawer</g-button>
        <g-drawer id="drawer-basic" placement="right">
          <span slot="header">
            <h3 style="margin:0;">Drawer</h3>
            <p style="margin:4px 0 0; opacity:.7;">This is a drawer</p>
          </span>
          <div slot="content">
            <p>Some content contained within the drawer.</p>
          </div>
        </g-drawer>
      </div>
    </div>
    <div class="playground">
      <h3>Placement</h3>
      <div class="demo" style="display:flex; gap:8px;">
        <g-button id="drawer-placement-top">Top</g-button>
        <g-button id="drawer-placement-right">Right</g-button>
        <g-button id="drawer-placement-bottom">Bottom</g-button>
        <g-button id="drawer-placement-left">Left</g-button>
        <g-drawer id="drawer-placement" placement="right">
          <span slot="header">
            <h3 style="margin:0;">Drawer</h3>
            <p style="margin:4px 0 0; opacity:.7;">This is a drawer</p>
          </span>
          <div slot="content">
            <p>Some content contained within the drawer.</p>
          </div>
        </g-drawer>
      </div>
    </div>
  `;
}

export function wire(container) {
  const basicOpen = container.querySelector("#drawer-basic-open");
  const basicDrawer = container.querySelector("#drawer-basic");
  if (basicOpen && basicDrawer) basicOpen.addEventListener("click", () => basicDrawer.show());

  const placementDrawer = container.querySelector("#drawer-placement");
  const placements = ["top", "right", "bottom", "left"];
  for (const placement of placements) {
    const btn = container.querySelector(`#drawer-placement-${placement}`);
    if (btn && placementDrawer) {
      btn.addEventListener("click", () => {
        placementDrawer.setAttribute("placement", placement);
        placementDrawer.show();
      });
    }
  }
}
