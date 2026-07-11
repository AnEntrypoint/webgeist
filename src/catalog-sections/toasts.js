export default function renderToastsSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Display an important message globally.</p>
      <div class="demo">
        <g-button id="toasts-basic">Show Toast</g-button>
      </div>
    </div>
    <div class="playground">
      <h3>Multiline</h3>
      <p>Display multiline or overlong text.</p>
      <div class="demo">
        <g-button id="toasts-multiline">Show Toast</g-button>
      </div>
    </div>
    <div class="playground">
      <h3>Type</h3>
      <div class="demo" style="display:flex; gap:8px;">
        <g-button id="toasts-success" type="success">Show Success</g-button>
        <g-button id="toasts-warning" type="warning">Show Warning</g-button>
        <g-button id="toasts-error" type="error">Show Error</g-button>
      </div>
    </div>
  `;
}

export function wire(container) {
  import("../utils/toasts.js").then(({ pushToast }) => {
    const bind = (id, toast) => {
      const btn = container.querySelector(`#${id}`);
      if (btn) btn.addEventListener("click", () => pushToast(toast));
    };

    bind("toasts-basic", {
      text: "HTTP is stateless, but not sessionless.",
    });

    bind("toasts-multiline", {
      text: "HTTP is a protocol which allows the fetching of resources, such as HTML documents. It is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient, usually the Web browser.",
    });

    bind("toasts-success", { text: "HTTP is stateless, but not sessionless.", type: "success" });
    bind("toasts-warning", { text: "HTTP is stateless, but not sessionless.", type: "warning" });
    bind("toasts-error", { text: "HTTP is stateless, but not sessionless.", type: "error" });
  });
}
