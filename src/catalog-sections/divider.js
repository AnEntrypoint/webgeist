export default function renderDividerSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>A divider line separates different content.</p>
      <div class="demo">
        <p>
          In server-driven content negotiation, or proactive content negotiation,
          the browser (or any other kind of user-agent) sends several HTTP headers along with the URL.
          These headers describe the preferred choice of the user.
        </p>
        <g-divider></g-divider>
        <p>
          The server uses them as hints and an internal algorithm chooses the best content to serve to the client.
          The algorithm is server-specific and not defined in the standard.
        </p>
      </div>
    </div>
    <div class="playground">
      <h3>With Text</h3>
      <p>Display text in the divider.</p>
      <div class="demo">
        <p>
          In server-driven content negotiation, or proactive content negotiation,
          the browser (or any other kind of user-agent) sends several HTTP headers along with the URL.
          These headers describe the preferred choice of the user.
        </p>
        <g-divider>HTTP</g-divider>
        <p>
          The server uses them as hints and an internal algorithm chooses the best content to serve to the client.
          The algorithm is server-specific and not defined in the standard.
        </p>
      </div>
    </div>
    <div class="playground">
      <h3>Vertical</h3>
      <p>Display a vertical divider between inline content.</p>
      <div class="demo" style="display:flex;align-items:center;height:60px;gap:12px;">
        <span>Left</span>
        <g-divider vertical></g-divider>
        <span>Right</span>
      </div>
    </div>
  `;
}
