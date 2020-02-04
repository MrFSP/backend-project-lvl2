import _ from 'lodash';
import parse from './parsers';

const isObject = (data) => typeof (data) === 'object';

const getDifference = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keys.map((key) => {
    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: 'objects', children: getDifference(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return {
        key, type: 'equal', oldValue: data1[key], newValue: data2[key],
      };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', newValue: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', newValue: data1[key] };
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }
    return null;
  }).sort();
};

const stringify = (data, key, lvl = 0, change = ' ', obj = false) => {
  if (isObject(data) || obj === true) {
    const newData = obj === true ? data : Object.keys(data)
      .map((k) => stringify(data[k], k, lvl + 4))
      .sort();
    return `\n${' '.repeat(lvl)}${change} ${key}: {${newData}\n${' '.repeat(lvl + 2)}}`;
  }
  return `\n${' '.repeat(lvl)}${change} ${key}: ${data}`;
};

const getRendering = (data, lvl) => data.reduce((newAcc, item) => {
  const currentLvl = lvl + 2;
  if (item.type === 'objects') {
    const newData = getRendering(item.children, currentLvl + 2);
    const newItem = stringify(newData, item.key, currentLvl, ' ', true);
    return [...newAcc, newItem];
  }
  if (item.type === 'equal') {
    const newItem = stringify(item.newValue, item.key, currentLvl);
    return [...newAcc, newItem];
  }
  if (item.type === 'added') {
    const newItem = stringify(item.newValue, item.key, currentLvl, '+');
    return [...newAcc, newItem];
  }
  if (item.type === 'removed') {
    const newItem = stringify(item.newValue, item.key, currentLvl, '-');
    return [...newAcc, newItem];
  }
  if (item.type === 'changed') {
    const oldItem = stringify(item.oldValue, item.key, currentLvl, '-');
    const newItem = stringify(item.newValue, item.key, currentLvl, '+');
    return [...newAcc, oldItem, newItem];
  }
  return [...newAcc];
}, []).join('');

export default (firstConfig, secondConfig) => {
  const data1 = parse(firstConfig);
  const data2 = parse(secondConfig);
  const difference = getDifference(data1, data2);
  const rendering = `{${getRendering(difference, 0)}\n}`;
  return rendering;
};
