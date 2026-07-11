export default function renderGridSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Dynamically scale container width while maintaining spacing.</p>
      <div class="demo" style="display:flex;gap:16px;justify-content:center;">
        <g-grid xs="6" style="height:100px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="6" style="height:100px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="6" style="height:100px;background:var(--geist-border);border-radius:8px;"></g-grid>
      </div>
    </div>
    <div class="playground">
      <h3>Fluid layout</h3>
      <p>Containers for wrapping and scaling.</p>
      <div class="demo" style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;">
        <g-grid xs="24" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="12" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="12" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="6" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="6" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="6" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="6" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
      </div>
    </div>
    <div class="playground">
      <h3>Responsive layout</h3>
      <p>Use different layouts for different screen widths.</p>
      <div class="demo" style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;">
        <g-grid xs="24" md="12" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="12" md="12" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="12" md="6" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="12" md="6" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
      </div>
    </div>
    <div class="playground">
      <h3>Hide elements</h3>
      <p>Hide elements when unit size is 0.</p>
      <div class="demo" style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;">
        <g-grid xs="12" sm="0" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="12" sm="0" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
        <g-grid xs="24" style="height:50px;background:var(--geist-border);border-radius:8px;"></g-grid>
      </div>
    </div>
  `;
}
