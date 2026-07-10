export function onClickAway(el, handler) {
  function listener(e) {
    if (!el.contains(e.target)) handler(e);
  }
  document.addEventListener("click", listener, true);
  return () => document.removeEventListener("click", listener, true);
}
