export function createModalController() {
  const listeners = new Set();
  let open = false;

  function notify() {
    listeners.forEach((fn) => fn(open));
  }

  return {
    isOpen: () => open,
    show() {
      open = true;
      notify();
    },
    hide() {
      open = false;
      notify();
    },
    toggle() {
      open = !open;
      notify();
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
