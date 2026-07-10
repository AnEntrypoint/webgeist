import * as webjsx from "webjsx";

export function render(container, vdom) {
  webjsx.applyDiff(container, vdom);
}
