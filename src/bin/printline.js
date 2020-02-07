export default (name, data) => {
  const nameLength = name.length;
  const widths = data.split('\n').map((item) => item.length);
  const maxWidth = Math.max.apply(null, widths);
  const lineLength = (maxWidth < 100) ? ((maxWidth - nameLength) / 2) : 40;
  const line = '_'.repeat(lineLength);
  return `${line}${name}${line}`;
};
