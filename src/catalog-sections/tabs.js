export default function renderTabsSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Toggle display of different templates.</p>
      <div class="demo">
        <g-tabs>
          <g-tab label="http" value="1">HTTP is stateless, but not sessionless.</g-tab>
          <g-tab label="proxies" value="2">Between the Web browser and the server, numerous computers and machines relay the HTTP messages.</g-tab>
        </g-tabs>
      </div>
    </div>
    <div class="playground">
      <h3>Scroll Behavior</h3>
      <p>If all tabs cannot fit in the width then hidden tabs can be accessed through user agent scrolling mechanisms.</p>
      <div class="demo">
        <g-tabs>
          <g-tab label="Home" value="1">Hello!</g-tab>
          <g-tab label="About" value="2">Cool stuff.</g-tab>
          <g-tab label="About Us" value="3">Good people.</g-tab>
          <g-tab label="Features" value="4">Amazing.</g-tab>
          <g-tab label="Pricing" value="5">Very low.</g-tab>
          <g-tab label="Docs" value="6">Clear.</g-tab>
          <g-tab label="Profile" value="7">Extraordinary person.</g-tab>
          <g-tab label="Settings" value="8">Easy to tweak.</g-tab>
          <g-tab label="Dashboard" value="9">Charts.</g-tab>
          <g-tab label="Policies" value="10">Privacy focused.</g-tab>
        </g-tabs>
      </div>
    </div>
  `;
}
