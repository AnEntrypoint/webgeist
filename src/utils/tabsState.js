export function createTabsState(initialValue) {
  let active = initialValue;
  const listeners = new Set();

  return {
    get: () => active,
    set(value) {
      active = value;
      listeners.forEach((fn) => fn(active));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
