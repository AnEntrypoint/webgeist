# webgeist

A clean port of [geist-ui](https://github.com/geist-org/geist-ui) built on [webjsx](https://webjsx.org/) — native Web Components + JSX, no React, no CSS-in-JS.

## Install

```
npm install
```

## Develop

```
npm run dev
```

## Build

```
npm run build
```

Outputs plain ESM to `dist/`. `npm run preview` serves the built output.

## Usage

Every component is a native custom element, prefixed `g-`. Import the ones you need (or `src/components/index.js` for all of them), then use them directly in HTML or JSX:

```jsx
import "webgeist/src/components/button.jsx";

const vdom = <g-button type="secondary">Click me</g-button>;
webjsx.applyDiff(document.getElementById("app"), vdom);
```

Or plain HTML, since they're standard custom elements:

```html
<script type="module" src="/src/components/button.jsx"></script>
<g-button type="secondary">Click me</g-button>
```

## JSX setup

`vite.config.js` wires the JSX pragma to webjsx:

```js
esbuild: {
  jsxFactory: "webjsx.createElement",
  jsxFragment: "webjsx.Fragment",
  jsxInject: `import * as webjsx from "webjsx"`,
}
```

## Theme

CSS custom properties in `src/theme/tokens.css` drive colors/spacing/radius/shadow. Switch dark mode by setting `data-theme="dark"` on `<html>`. `src/theme/baseline.css` provides a minimal reset.

## Catalog

`index-catalog.html` demonstrates a subset of components live. Run `npm run dev` and open `/index-catalog.html`.

## Components

Layout: `g-row`/`g-col`, `g-spacer`, `g-divider`, `g-card`, `g-fieldset`, `g-page`.
Forms: `g-button`, `g-input`, `g-textarea`, `g-checkbox`, `g-radio`, `g-toggle`, `g-select`, `g-slider`, `g-rating`, `g-auto-complete`.
Display: `g-text`, `g-avatar`, `g-badge`, `g-tag`, `g-dot`, `g-capacity`, `g-progress`, `g-loading`, `g-spinner`, `g-image`, `g-code`, `g-keyboard`, `g-snippet`, `g-user`, `g-note`, `g-description`, `g-display`.
Navigation: `g-link`, `g-breadcrumbs`, `g-pagination`, `g-tabs`, `g-collapse`, `g-tree`, `g-table`.
Overlay: `g-popover`, `g-tooltip`, `g-modal`, `g-drawer`.
