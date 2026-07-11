export default function renderCardSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>A common container component.</p>
      <div class="demo">
        <g-card>
          <p>A basic card.</p>
        </g-card>
      </div>
    </div>
    <div class="playground">
      <h3>Hoverable</h3>
      <p>Add an effect on hover.</p>
      <div class="demo">
        <g-card hoverable>
          <p>Hoverable card.</p>
        </g-card>
      </div>
    </div>
    <div class="playground">
      <h3>Shadow</h3>
      <p>Show shadow.</p>
      <div class="demo">
        <g-card shadow>
          <h4 style="margin:0;">HTTP is extensible</h4>
          <p>Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiment with. New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics.</p>
        </g-card>
      </div>
    </div>
    <div class="playground">
      <h3>With Footer</h3>
      <p>Use the footer slot for actions or extra content.</p>
      <div class="demo">
        <g-card style="width:100%;">
          <h4 style="margin:0;">Geist UI React</h4>
          <p>Modern and minimalist React UI library.</p>
          <div slot="footer">
            <g-link href="https://github.com/geist-org/geist-ui" color="var(--geist-accent)">Visit source code on GitHub.</g-link>
          </div>
        </g-card>
      </div>
    </div>
    <div class="playground">
      <h3>With Header</h3>
      <p>Use the header slot to introduce card content.</p>
      <div class="demo">
        <g-card style="width:400px;">
          <div slot="header"><strong>Description</strong></div>
          <p>The Object constructor creates an object wrapper for the given value.</p>
          <p>When called in a non-constructor context, Object behaves identically to <code>new Object()</code>.</p>
        </g-card>
      </div>
    </div>
  `;
}
