export default function renderCodeSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Basic inline codes.</p>
      <div class="demo">
        <g-text>Run <g-code>npm i @geist-ui/core</g-code> to install.</g-text>
      </div>
    </div>
    <div class="playground">
      <h3>Code Block</h3>
      <p>Multi line code display.</p>
      <div class="demo">
        <g-code block>function greet(name) {
  return \`Hello, \${name}!\`;
}</g-code>
      </div>
    </div>
    <div class="playground">
      <h3>Width</h3>
      <p>Specify width manually, or other styles.</p>
      <div class="demo">
        <g-code block style="width:50%;">const greeting = "hi";</g-code>
      </div>
    </div>
  `;
}
