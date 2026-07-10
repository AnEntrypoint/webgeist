import "./components/index.js";
import "./theme/tokens.css";
import "./theme/baseline.css";

const app = document.getElementById("app");

app.innerHTML = `
  <h1>webgeist component catalog</h1>
  <p><a href="./demo-counter.html">applyDiff counter demo &rarr;</a></p>

  <section>
    <h2>Button</h2>
    <g-button>Default</g-button>
    <g-button type="secondary">Secondary</g-button>
    <g-button type="success">Success</g-button>
    <g-button loading>Loading</g-button>
    <g-button disabled>Disabled</g-button>
  </section>

  <section>
    <h2>Input</h2>
    <g-input label="Name" placeholder="Type here" clearable></g-input>
  </section>

  <section>
    <h2>Checkbox / Radio / Toggle</h2>
    <g-checkbox>Accept</g-checkbox>
    <g-radio-group>
      <g-radio value="a">A</g-radio>
      <g-radio value="b">B</g-radio>
    </g-radio-group>
    <g-toggle></g-toggle>
  </section>

  <section>
    <h2>Card</h2>
    <g-card>
      <span slot="header">Card title</span>
      Card body content
    </g-card>
  </section>

  <section>
    <h2>Tag / Badge / Dot</h2>
    <g-tag>Default</g-tag>
    <g-badge count="5"></g-badge>
    <g-dot type="success"></g-dot>
  </section>

  <section>
    <h2>Progress / Loading / Spinner</h2>
    <g-progress value="60"></g-progress>
    <g-loading></g-loading>
    <g-spinner></g-spinner>
  </section>

  <section>
    <h2>Tabs</h2>
    <g-tabs>
      <g-tab label="One">Panel one</g-tab>
      <g-tab label="Two">Panel two</g-tab>
    </g-tabs>
  </section>

  <section>
    <h2>Modal</h2>
    <g-button id="open-modal">Open modal</g-button>
    <g-modal id="demo-modal">
      <span slot="header">Modal title</span>
      Modal content
    </g-modal>
  </section>
`;

const openBtn = document.getElementById("open-modal");
const modal = document.getElementById("demo-modal");
if (openBtn && modal && typeof modal.show === "function") {
  openBtn.addEventListener("click", () => modal.show());
}
