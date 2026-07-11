export default function renderSliderSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Accept clicks or drag actions.</p>
      <div class="demo">
        <g-slider value="20"></g-slider>
      </div>
    </div>
    <div class="playground">
      <h3>Disabled</h3>
      <p>Do not respond to drag and click.</p>
      <div class="demo">
        <g-slider value="50" disabled></g-slider>
      </div>
    </div>
    <div class="playground">
      <h3>Step</h3>
      <p>Different granularity.</p>
      <div class="demo">
        <g-slider step="10" style="width:75%"></g-slider>
      </div>
    </div>
    <div class="playground">
      <h3>Range</h3>
      <p>Specifies the maximum or minimum value of the Slider.</p>
      <div class="demo">
        <g-slider step="5" max="50" min="10" value="25" style="width:75%"></g-slider>
        <g-slider step="0.2" max="1" min="0.2" value="0.4" style="width:75%"></g-slider>
      </div>
    </div>
    <div class="playground">
      <h3>Event</h3>
      <p>Get event when slide.</p>
      <div class="demo">
        <g-slider id="slider-event" style="width:75%"></g-slider>
      </div>
    </div>
  `;
}

export function wire(container) {
  const slider = container.querySelector("#slider-event");
  if (slider) {
    slider.addEventListener("change", (e) => {
      console.log("slider changed:", e.detail);
    });
  }
}
