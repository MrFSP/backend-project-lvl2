import { isObject } from '../getdifference';

const stringify = (data, key, lvl, change = ' ', obj = false) => {
  if (isObject(data) || obj === true) {
    const newData = obj === true ? data : Object.keys(data)
      .map((k) => stringify(data[k], k, lvl + 4))
      .sort();
    return `\n${' '.repeat(lvl)}${change} ${key}: {${newData}\n${' '.repeat(lvl + 2)}}`;
  }
  return `\n${' '.repeat(lvl)}${change} ${key}: ${data}`;
};

const getRenderedItem = (type, key, newValue, oldValue, lvl, acc) => {
  switch (type) {
    case 'equal': {
      const newItem = stringify(newValue, key, lvl);
      return [...acc, newItem];
    }
    case 'added': {
      const newItem = stringify(newValue, key, lvl, '+');
      return [...acc, newItem];
    }
    case 'deleted': {
      const newItem = stringify(newValue, key, lvl, '-');
      return [...acc, newItem];
    }
    default: {
      const oldItem = stringify(oldValue, key, lvl, '-');
      const newItem = stringify(newValue, key, lvl, '+');
      return [...acc, oldItem, newItem];
    }
  }
};

const getRendering = (data, lvl = 0) => data.reduce((acc, item) => {
  const currentLvl = lvl + 2;
  const {
    type, key, newValue, oldValue, children,
  } = item;
  if (type === 'tree') {
    const newData = getRendering(children, currentLvl + 2);
    const newItem = stringify(newData, key, currentLvl, ' ', true);
    return [...acc, newItem];
  }
  return getRenderedItem(type, key, newValue, oldValue, currentLvl, acc);
}, []).join('');

export default (data) => `{${getRendering(data)}\n}`;
