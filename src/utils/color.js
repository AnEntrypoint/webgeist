function hexToRgb(color) {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const full = color.replace(fullReg, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  if (!values) {
    throw new Error(`webgeist: Unsupported ${color} color.`);
  }
  return [
    Number.parseInt(values[1], 16),
    Number.parseInt(values[2], 16),
    Number.parseInt(values[3], 16),
  ];
}

export function colorToRgbValues(color) {
  if (color.charAt(0) === "#") return hexToRgb(color);

  const safeColor = color.replace(/ /g, "");
  const colorType = color.substr(0, 4);

  const regArray = safeColor.match(/\((.+)\)/);
  if (!colorType.startsWith("rgb") || !regArray) {
    throw new Error(`webgeist: Only support ["RGB", "RGBA", "HEX"] color.`);
  }

  return regArray[1].split(",").map((str) => Number.parseFloat(str));
}

export function addColorAlpha(color, alpha) {
  const [r, g, b] = colorToRgbValues(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
