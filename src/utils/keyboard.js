export function onKey(el, key, handler) {
  function listener(e) {
    if (e.key === key) handler(e);
  }
  el.addEventListener("keydown", listener);
  return () => el.removeEventListener("keydown", listener);
}
