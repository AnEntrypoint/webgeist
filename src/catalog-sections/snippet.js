export default function renderSnippetSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Display a snippet of copyable code for the command line.</p>
      <div class="demo" style="width:300px;">
        <g-snippet>yarn add @geist-ui/core</g-snippet>
      </div>
    </div>
    <div class="playground">
      <h3>Multi Line</h3>
      <p>Display multiple lines of code.</p>
      <div class="demo" style="width:300px;">
        <g-snippet>cd project
now</g-snippet>
      </div>
    </div>
  `;
}
