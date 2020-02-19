import _ from 'lodash';

const stringify = {
  begin(key, lvl, change = ' ') {
    return `${' '.repeat(lvl)}${change} ${key}: `;
  },
  value(data, key, lvl, change = ' ') {
    if (!_.isObject(data)) {
      return `${this.begin(key, lvl, change)}${data}`;
    }
    const newData = Object.keys(data).map((k) => this.value(data[k], k, lvl + 4)).sort();
    return this.obj(newData, key, lvl, change);
  },
  obj(data, key, lvl, change = ' ') {
    return `${this.begin(key, lvl, change)}{\n${data}\n${' '.repeat(lvl + 2)}}`;
  },
};

const getRendering = (data, lvl = 0) => data.map((item) => {
  const currentLvl = lvl + 2;
  const {
    type, key, newValue, oldValue, children,
  } = item;
  switch (type) {
    case 'tree': {
      const newData = getRendering(children, currentLvl + 2);
      const newItem = stringify.obj(newData, key, currentLvl);
      return newItem;
    }
    case 'equal': {
      return stringify.value(newValue, key, currentLvl);
    }
    case 'added': {
      return stringify.value(newValue, key, currentLvl, '+');
    }
    case 'deleted': {
      return stringify.value(newValue, key, currentLvl, '-');
    }
    default: {
      const oldItem = stringify.value(oldValue, key, currentLvl, '-');
      const newItem = stringify.value(newValue, key, currentLvl, '+');
      return `${oldItem}\n${newItem}`;
    }
  }
}).join('\n');

export default (data) => `{\n${getRendering(data)}\n}`;
