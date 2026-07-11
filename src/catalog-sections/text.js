export default function renderTextSection() {
  return `
    <div class="playground">
      <h3>Headings</h3>
      <p>Use Text to standardize text content.</p>
      <div class="demo">
        <g-text type="h1">Start our Geist journey.</g-text>
      </div>
    </div>
    <div class="playground">
      <h3>Paragraph</h3>
      <p>Use the p and b types on a Text.</p>
      <div class="demo">
        <g-text type="p">
          Caching is very important for fast Web sites. This article describes different methods of caching and how to use HTTP Headers to control them.
        </g-text>
        <g-text type="b">
          A brief description of the changes between the early versions of HTTP, to the modern HTTP/2, the emergent HTTP/3 and beyond.
        </g-text>
      </div>
    </div>
    <div class="playground">
      <h3>Small</h3>
      <div class="demo">
        <g-text type="small">
          HTTP response codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes: informational responses, successful responses, redirections, client errors, and servers errors.
        </g-text>
      </div>
    </div>
    <div class="playground">
      <h3>Headings scale</h3>
      <p>All heading levels supported by Text.</p>
      <div class="demo">
        <g-text type="h1">Heading 1</g-text>
        <g-text type="h2">Heading 2</g-text>
        <g-text type="h3">Heading 3</g-text>
        <g-text type="h4">Heading 4</g-text>
        <g-text type="h5">Heading 5</g-text>
        <g-text type="h6">Heading 6</g-text>
      </div>
    </div>
  `;
}
