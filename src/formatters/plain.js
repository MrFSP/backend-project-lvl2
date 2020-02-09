import { isObject } from '../getdifference';

const stringify = (prop, change, value, oldValue) => {
  switch (change) {
    case 'changed': {
      return `Property '${prop}' was changed from ${oldValue} to ${value}`;
    }
    case 'added': {
      return `Property '${prop}' was added with value: ${value}`;
    }
    case 'deleted': {
      return `Property '${prop}' was deleted`;
    }
    case 'tree': {
      return `Property '${prop}' was changed`;
    }
    default:
      return `Property '${prop}' was not changed`;
  }
};

const getStringifiedInnerItems = (father, change, value) => {
  if (!isObject(value)) {
    return stringify(father, change, value);
  }
  const stringifiedItem = stringify(father, change, '[complex value]');
  const keys = Object.keys(value);
  const stringifiedInnerItems = keys.reduce((acc, k) => {
    const currentKey = `${father}.${k}`;
    const newStringifiedItem = stringify(currentKey, change, value[k]);
    return [...acc, newStringifiedItem];
  }, []);
  return [stringifiedItem, ...stringifiedInnerItems].join('\n');
};

const getRendering = (data, father = '') => data.reduce((acc, item) => {
  const {
    key, type, children, newValue, oldValue,
  } = item;
  const currentKey = father === '' ? key : `${father}.${key}`;
  switch (type) {
    case 'tree': {
      const renderedInnerItems = getRendering(children, currentKey);
      const stringifiedItem = stringify(currentKey, 'tree');
      return [...acc, stringifiedItem, renderedInnerItems];
    }
    case 'deleted': {
      return [...acc, stringify(currentKey, 'deleted')];
    }
    case 'added': {
      const newItem = getStringifiedInnerItems(currentKey, 'added', newValue);
      return [...acc, newItem];
    }
    case 'changed': {
      if (isObject(oldValue) || isObject(newValue)) {
        const changedItem = stringify(currentKey, 'tree');
        const newItems = getStringifiedInnerItems(currentKey, 'added', newValue);
        return [...acc, changedItem, newItems];
      }
      const changedItem = stringify(currentKey, 'changed', newValue, oldValue);
      return [...acc, changedItem];
    }
    default: {
      return [...acc, stringify(currentKey, '', newValue)];
    }
  }
}, []).join('\n');

export const getFilteredData = (data, option) => data.split('\n').filter((item) => {
  switch (option) {
    case 'differ':
      return !(item.indexOf('not') !== -1);
    case 'added':
      return item.indexOf('added') !== -1;
    case 'deleted':
      return item.indexOf('deleted') !== -1;
    default:
      return item.indexOf('not') !== -1;
  }
}).join('\n');


export default (data, option) => {
  const renderedData = getRendering(data);
  return option === null ? renderedData : getFilteredData(renderedData, option);
};
