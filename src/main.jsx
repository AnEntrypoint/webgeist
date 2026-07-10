import { render } from "./render.js";

let count = 0;

function view() {
  return (
    <div>
      <h1>webgeist</h1>
      <button onclick={() => { count++; renderApp(); }}>Count: {count}</button>
    </div>
  );
}

function renderApp() {
  render(document.getElementById("app"), view());
}

renderApp();
