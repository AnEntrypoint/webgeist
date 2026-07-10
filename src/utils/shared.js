let uidCounter = 0;

export function uid(prefix = "geist") {
  uidCounter += 1;
  return `${prefix}-${uidCounter}`;
}

function classObjectToString(obj) {
  let str = "";
  for (const key in obj) {
    if (!obj[key]) continue;
    str = str ? `${str} ${key}` : key;
  }
  return str;
}

export function cx(...classNames) {
  let classes = "";
  for (const val of classNames) {
    if (!val) continue;
    if (typeof val === "object" && !Array.isArray(val)) {
      classes += ` ${classObjectToString(val)}`;
    } else {
      classes += ` ${String(val).trim()}`;
    }
  }
  return classes.trim();
}

export function definedProps(obj) {
  const out = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) out[key] = obj[key];
  }
  return out;
}
