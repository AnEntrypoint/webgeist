import "./components/index.js";
import "./theme/tokens.css";
import "./theme/baseline.css";
import "./theme/catalog.css";
import { SECTIONS, GROUP_ORDER } from "./catalog-sections/index.js";

const sectionModules = import.meta.glob("./catalog-sections/*.js", { eager: true });

function moduleFor(id) {
  return sectionModules[`./catalog-sections/${id}.js`];
}

function buildSidebar() {
  const groups = GROUP_ORDER.map((group) => {
    const items = SECTIONS.filter((s) => s.group === group);
    if (!items.length) return "";
    const links = items
      .map((s) => `<li><a href="#${s.id}">${s.title}</a></li>`)
      .join("");
    return `<h4>${group}</h4><ul>${links}</ul>`;
  }).join("");

  return `
    <aside class="catalog-sidebar">
      <h1>webgeist</h1>
      <p class="subtitle">geist-ui, ported to webjsx</p>
      <a class="counter-link" href="./demo-counter.html">applyDiff counter demo &rarr;</a>
      <nav>${groups}</nav>
    </aside>
  `;
}

function buildSections() {
  return SECTIONS.map((s) => {
    const mod = moduleFor(s.id);
    const body = mod && mod.default ? mod.default() : `<p class="playground">No demo yet.</p>`;
    return `
      <section class="catalog-component-section" id="${s.id}">
        <h2>${s.title}</h2>
        ${body}
      </section>
    `;
  }).join("");
}

const app = document.getElementById("app");
app.innerHTML = `
  <div class="catalog-layout">
    ${buildSidebar()}
    <main class="catalog-main">${buildSections()}</main>
  </div>
`;

for (const s of SECTIONS) {
  const mod = moduleFor(s.id);
  if (mod && typeof mod.wire === "function") {
    const container = document.getElementById(s.id);
    if (container) mod.wire(container);
  }
}
