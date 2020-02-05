import { isObject } from '../makediff';

const stringify = (data, key, lvl = 0, change = ' ', obj = false) => {
  if (isObject(data) || obj === true) {
    const newData = obj === true ? data : Object.keys(data)
      .map((k) => stringify(data[k], k, lvl + 4))
      .sort();
    return `\n${' '.repeat(lvl)}${change} ${key}: {${newData}\n${' '.repeat(lvl + 2)}}`;
  }
  return `\n${' '.repeat(lvl)}${change} ${key}: ${data}`;
};

const getRendering = (data, lvl = 0) => data.reduce((acc, item) => {
  const currentLvl = lvl + 2;
  switch (item.type) {
    case 'objects': {
      const newData = getRendering(item.children, currentLvl + 2);
      const newItem = stringify(newData, item.key, currentLvl, ' ', true);
      return [...acc, newItem];
    }
    case 'equal': {
      const newItem = stringify(item.newValue, item.key, currentLvl);
      return [...acc, newItem];
    }
    case 'added': {
      const newItem = stringify(item.newValue, item.key, currentLvl, '+');
      return [...acc, newItem];
    }
    case 'deleted': {
      const newItem = stringify(item.newValue, item.key, currentLvl, '-');
      return [...acc, newItem];
    }
    case 'changed': {
      const oldItem = stringify(item.oldValue, item.key, currentLvl, '-');
      const newItem = stringify(item.newValue, item.key, currentLvl, '+');
      return [...acc, oldItem, newItem];
    }
    default: return acc;
  }
}, []).join('');

export default (data) => `{${getRendering(data)}\n}`;
