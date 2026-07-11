export default function renderTooltipSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Basic usage.</p>
      <div class="demo">
        <g-tooltip text="Push to Git and your website is live.">
          <span slot="trigger">Tooltip</span>
        </g-tooltip>
      </div>
    </div>
    <div class="playground">
      <h3>With Components</h3>
      <p>Combined with different components.</p>
      <div class="demo" style="display:flex;gap:16px;align-items:center;">
        <g-tooltip text="Push to Git and your website is live.">
          <g-button slot="trigger" auto>Button</g-button>
        </g-tooltip>
        <g-tooltip text="Push to Git and your website is live.">
          <g-badge slot="trigger">1000+</g-badge>
        </g-tooltip>
        <g-tooltip text="Push to Git and your website is live.">
          <g-link slot="trigger" href="#" color>Hyperlink</g-link>
        </g-tooltip>
      </div>
    </div>
    <div class="playground">
      <h3>Placements</h3>
      <p>Position the tooltip relative to the target.</p>
      <div class="demo" style="display:flex;gap:32px;">
        <g-tooltip text="HTTP is stateless, but not sessionless" placement="top">
          <span slot="trigger">Top</span>
        </g-tooltip>
        <g-tooltip text="HTTP is stateless, but not sessionless" placement="bottom">
          <span slot="trigger">Bottom</span>
        </g-tooltip>
        <g-tooltip text="HTTP is stateless, but not sessionless" placement="left">
          <span slot="trigger">Left</span>
        </g-tooltip>
        <g-tooltip text="HTTP is stateless, but not sessionless" placement="right">
          <span slot="trigger">Right</span>
        </g-tooltip>
      </div>
    </div>
  `;
}
