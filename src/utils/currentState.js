export function createState(initial) {
  let value = initial;
  const get = () => value;
  const set = (next) => {
    value = typeof next === "function" ? next(value) : next;
    return value;
  };
  return [get, set];
}
