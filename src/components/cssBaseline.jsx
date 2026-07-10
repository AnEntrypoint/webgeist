const TOKENS_CSS = `
:root {
  --geist-bg: #fff;
  --geist-fg: #000;
  --geist-border: #eaeaea;
  --geist-accent: #0070f3;
  --geist-error: #ee0000;
  --geist-warning: #f5a623;
  --geist-success: #0070f3;
  --geist-secondary: #666;

  --geist-radius: 5px;
  --geist-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 2px 2px rgba(0,0,0,.04);

  --geist-gap-xs: 4px;
  --geist-gap-sm: 8px;
  --geist-gap: 16px;
  --geist-gap-lg: 24px;
  --geist-gap-xl: 32px;

  --geist-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --geist-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
}

:root[data-theme="dark"] {
  --geist-bg: #000;
  --geist-fg: #fff;
  --geist-border: #333;
  --geist-secondary: #888;
}
`;

const BASELINE_CSS = `
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--geist-bg);
  color: var(--geist-fg);
  font-family: var(--geist-font);
  line-height: 1.5;
}

img, svg {
  display: block;
  max-width: 100%;
}

button, input, textarea, select {
  font: inherit;
  color: inherit;
}
`;

const STYLE_TAG_ID = "g-css-baseline-style";

class GeistCssBaseline extends HTMLElement {
  connectedCallback() {
    if (!document.getElementById(STYLE_TAG_ID)) {
      const styleEl = document.createElement("style");
      styleEl.id = STYLE_TAG_ID;
      styleEl.textContent = `${TOKENS_CSS}\n${BASELINE_CSS}`;
      document.head.appendChild(styleEl);
    }
  }
}

customElements.define("g-css-baseline", GeistCssBaseline);
