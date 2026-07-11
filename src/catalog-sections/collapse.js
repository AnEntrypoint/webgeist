export default function renderCollapseSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Show title only by default.</p>
      <div class="demo">
        <g-collapse-group>
          <g-collapse title="Question A">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </g-collapse>
          <g-collapse title="Question B">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </g-collapse>
        </g-collapse-group>
      </div>
    </div>
    <div class="playground">
      <h3>Expanded</h3>
      <p>Specify what to display first.</p>
      <div class="demo">
        <g-collapse-group>
          <g-collapse title="Question A" expanded>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </g-collapse>
          <g-collapse title="Question B">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </g-collapse>
        </g-collapse-group>
      </div>
    </div>
  `;
}
