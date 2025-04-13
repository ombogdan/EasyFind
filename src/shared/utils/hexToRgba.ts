export function hexToRGBA(hex: string, alpha = 1) {
  let processedHex = hex.replace(/^#/, '');
  if (processedHex.length === 3) {
    processedHex = processedHex.split('').map(char => char + char).join('');
  }

  const bigint = parseInt(processedHex, 16);
  const r = (bigint >> 16) & 255; // eslint-disable-line no-bitwise
  const g = (bigint >> 8) & 255;  // eslint-disable-line no-bitwise
  const b = bigint & 255;         // eslint-disable-line no-bitwise

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
