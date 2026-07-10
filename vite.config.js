import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  esbuild: {
    jsxFactory: "webjsx.createElement",
    jsxFragment: "webjsx.Fragment",
    jsxInject: `import * as webjsx from "webjsx"`,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        catalog: resolve(__dirname, "index-catalog.html"),
      },
    },
  },
});
