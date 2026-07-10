import { uid } from "./shared.js";

const queue = [];
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn([...queue]));
}

export function pushToast(toast) {
  const id = uid("toast");
  const entry = { id, type: "default", duration: 3000, ...toast };
  queue.push(entry);
  notify();
  if (entry.duration > 0) {
    setTimeout(() => removeToast(id), entry.duration);
  }
  return id;
}

export function removeToast(id) {
  const idx = queue.findIndex((t) => t.id === id);
  if (idx !== -1) {
    queue.splice(idx, 1);
    notify();
  }
}

export function subscribeToasts(fn) {
  listeners.add(fn);
  fn([...queue]);
  return () => listeners.delete(fn);
}
