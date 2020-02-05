import { isObject } from '../makediff';

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
    case 'objects': {
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
    const newKey = `${father}.${k}`;
    const stringifiedItem1 = stringify(newKey, change, value[k]);
    return isObject(value.k) ? [...acc, getStringifiedInnerItems(newKey, change, value.k)]
      : [...acc, stringifiedItem1];
  }, []);
  return [stringifiedItem, ...stringifiedInnerItems].join('\n');
};

const getRendering = (data, father = '') => data.reduce((acc, item) => {
  const key = father === '' ? item.key : `${father}.${item.key}`;
  switch (item.type) {
    case 'objects': {
      const renderedInnerItems = getRendering(item.children, key);
      const stringifiedItem = stringify(key, 'objects');
      return [...acc, stringifiedItem, renderedInnerItems];
    }
    case 'deleted': {
      return [...acc, stringify(key, 'deleted')];
    }
    case 'added': {
      const newItem = getStringifiedInnerItems(key, 'added', item.newValue);
      return [...acc, newItem];
    }
    case 'changed': {
      if (isObject(item.oldValue) || isObject(item.newValue)) {
        const changedItem = stringify(key, 'objects');
        const newItems = getStringifiedInnerItems(key, 'added', item.newValue);
        return [...acc, changedItem, newItems];
      }
      const changedItem = stringify(key, 'changed', item.newValue, item.oldValue);
      return [...acc, changedItem];
    }
    default: {
      return [...acc, stringify(key, '', item.newValue)];
    }
  }
}, []).join('\n');

export default (data) => getRendering(data);
