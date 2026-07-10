export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export function matchBreakpoint(name) {
  const min = breakpoints[name] ?? 0;
  return window.matchMedia(`(min-width: ${min}px)`).matches;
}

export function onMediaChange(query, handler) {
  const mql = window.matchMedia(query);
  const listener = (e) => handler(e.matches);
  mql.addEventListener("change", listener);
  handler(mql.matches);
  return () => mql.removeEventListener("change", listener);
}
