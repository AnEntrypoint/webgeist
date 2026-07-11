export default function renderSpacerSection() {
  return `
    <div class="playground">
      <h3>Vertical</h3>
      <p>Provide empty vertical space between elements.</p>
      <div class="demo">
        <div style="background:#444;border-radius:15px;height:40px;"></div>
        <g-spacer height="2"></g-spacer>
        <div style="background:#666;border-radius:15px;height:60px;"></div>
        <g-spacer height="3"></g-spacer>
        <div style="background:#999;border-radius:15px;height:80px;"></div>
      </div>
    </div>
    <div class="playground">
      <h3>Horizontal</h3>
      <p>Provide empty horizontal space between elements.</p>
      <div class="demo" style="display:flex;align-items:center;">
        <div style="background:#444;border-radius:15px;width:80px;height:40px;"></div>
        <g-spacer width="5" inline></g-spacer>
        <div style="background:#444;border-radius:15px;width:80px;height:40px;"></div>
      </div>
    </div>
  `;
}
