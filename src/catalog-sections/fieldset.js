export default function renderFieldsetSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Add custom buttons.</p>
      <div class="demo">
        <g-fieldset>
          <span slot="title">HTTP is simple</span>
          <span slot="subtitle">HTTP is generally designed to be simple and human readable, even with the added complexity introduced in HTTP/2 by encapsulating HTTP messages into frames.</span>
          <span slot="actions">
            <g-button auto scale="0.33">OK</g-button>
          </span>
        </g-fieldset>
      </div>
    </div>
    <div class="playground">
      <h3>Custom text</h3>
      <p>Representation in different situations.</p>
      <div class="demo">
        <g-fieldset>
          <span slot="title">HTTP is extensible</span>
          <span slot="subtitle">Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiment with.</span>
          <span slot="actions">
            <g-text type="error">An error has occurred.</g-text>
            <g-button auto scale="0.33" type="error">Revert</g-button>
          </span>
        </g-fieldset>
      </div>
    </div>
  `;
}
