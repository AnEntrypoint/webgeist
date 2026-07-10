let uidCounter = 0;

export function uid(prefix = "geist") {
  uidCounter += 1;
  return `${prefix}-${uidCounter}`;
}

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function definedProps(obj) {
  const out = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) out[key] = obj[key];
  }
  return out;
}
