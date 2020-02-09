import { isObject } from '../getdifference';

const stringify = (data, key, currentLvl, change = ' ', obj = false) => {
  if (isObject(data) || obj === true) {
    const newData = obj === true ? data : Object.keys(data)
      .map((k) => stringify(data[k], k, currentLvl + 4))
      .sort();
    return `\n${' '.repeat(currentLvl)}${change} ${key}: {${newData}\n${' '.repeat(currentLvl + 2)}}`;
  }
  return `\n${' '.repeat(currentLvl)}${change} ${key}: ${data}`;
};

const getRendering = (data, lvl = 0) => data.reduce((acc, item) => {
  const currentLvl = lvl + 2;
  const {
    type, key, newValue, oldValue, children,
  } = item;
  switch (type) {
    case 'tree': {
      const newData = getRendering(children, currentLvl + 2);
      const newItem = stringify(newData, key, currentLvl, ' ', true);
      return [...acc, newItem];
    }
    case 'equal': {
      const newItem = stringify(newValue, key, currentLvl);
      return [...acc, newItem];
    }
    case 'added': {
      const newItem = stringify(newValue, key, currentLvl, '+');
      return [...acc, newItem];
    }
    case 'deleted': {
      const newItem = stringify(newValue, key, currentLvl, '-');
      return [...acc, newItem];
    }
    default: {
      const oldItem = stringify(oldValue, key, currentLvl, '-');
      const newItem = stringify(newValue, key, currentLvl, '+');
      return [...acc, oldItem, newItem];
    }
  }
}, []).join('');

export default (data) => `{${getRendering(data)}\n}`;
