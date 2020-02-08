export default (option) => {
  switch (option) {
    case 'differ':
      return (item) => !(item.indexOf('not') !== -1 || item.indexOf('is tree') !== -1);
    case 'added':
      return (item) => item.indexOf('added') !== -1;
    case 'deleted':
      return (item) => item.indexOf('deleted') !== -1;
    default:
      return (item) => item.indexOf('not') !== -1;
  }
};
