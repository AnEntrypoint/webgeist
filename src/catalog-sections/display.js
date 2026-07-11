export default function renderDisplaySection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Describe the main part with a paragraph.</p>
      <div class="demo">
        <g-display>
          <g-image width="435px" height="200px" src="/images/geist-banner.png"></g-image>
          <span slot="caption">An open-source design system for building modern websites and applications.</span>
        </g-display>
      </div>
    </div>
    <div class="playground">
      <h3>With Code</h3>
      <p>Show multiline code blocks.</p>
      <div class="demo">
        <g-display>
          <g-code block>{
  "build": {
    "env": {
      "VARIABLE_NAME": "@secret-name"
    }
  }
}</g-code>
          <span slot="caption">Application's build with a defined environment variable.</span>
        </g-display>
      </div>
    </div>
    <div class="playground">
      <h3>With Snippet</h3>
      <p>Show shell codes.</p>
      <div class="demo">
        <g-display>
          <g-snippet>yarn add @geist-ui/core</g-snippet>
          <span slot="caption">Run this command to install the library.</span>
        </g-display>
      </div>
    </div>
    <div class="playground">
      <h3>Component Caption</h3>
      <p>Use a component inside the caption slot.</p>
      <div class="demo">
        <g-display>
          <g-image width="650px" height="297px" src="/images/geist-banner.png"></g-image>
          <span slot="caption">Browse <g-code>geist-ui.dev</g-code> for more documentation.</span>
        </g-display>
      </div>
    </div>
  `;
}
