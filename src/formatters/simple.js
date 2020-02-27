import _ from 'lodash';

const stringify = (data, key, lvl, change = ' ') => {
  if (!_.isObject(data)) {
    return `${' '.repeat(lvl)}${change} ${key}: ${data}`;
  }
  const newData = Object.keys(data).map((k) => stringify(data[k], k, lvl + 4)).sort();
  return `${' '.repeat(lvl)}${change} ${key}: {\n${newData}\n${' '.repeat(lvl + 2)}}`;
};

const getRendering = (data, lvl = 0) => data.map((item) => {
  const currentLvl = lvl + 2;
  const {
    type, key, newValue, oldValue, children,
  } = item;
  switch (type) {
    case 'tree': {
      const nestedData = getRendering(children, currentLvl + 2);
      const newItem = `${' '.repeat(currentLvl + 2)}${key}: {\n${nestedData}\n${' '.repeat(currentLvl + 2)}}`;
      return newItem;
    }
    case 'equal': {
      return stringify(newValue, key, currentLvl);
    }
    case 'added': {
      return stringify(newValue, key, currentLvl, '+');
    }
    case 'deleted': {
      return stringify(newValue, key, currentLvl, '-');
    }
    case 'changed': {
      const oldItem = stringify(oldValue, key, currentLvl, '-');
      const newItem = stringify(newValue, key, currentLvl, '+');
      return `${oldItem}\n${newItem}`;
    }
    default: {
      throw new Error(`The property ${type} is unexpected`);
    }
  }
}).join('\n');

export default (data) => `{\n${getRendering(data)}\n}`;
