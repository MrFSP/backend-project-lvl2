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
    const newKey = `${father}.${k}`;
    const newStringifiedItem = stringify(newKey, change, value[k]);
    return [...acc, newStringifiedItem];
  }, []);
  return [stringifiedItem, ...stringifiedInnerItems].join('\n');
};

const getRenderedItemsByType = (acc, type, key, oldValue, newValue) => {
  switch (type) {
    case 'deleted': {
      return [...acc, stringify(key, 'deleted')];
    }
    case 'added': {
      const newItem = getStringifiedInnerItems(key, 'added', newValue);
      return [...acc, newItem];
    }
    case 'changed': {
      if (isObject(oldValue) || isObject(newValue)) {
        const changedItem = stringify(key, 'tree');
        const newItems = getStringifiedInnerItems(key, 'added', newValue);
        return [...acc, changedItem, newItems];
      }
      const changedItem = stringify(key, 'changed', newValue, oldValue);
      return [...acc, changedItem];
    }
    default: {
      return [...acc, stringify(key, '', newValue)];
    }
  }
};

const getRendering = (data, father = '') => data.reduce((acc, item) => {
  const key = father === '' ? item.key : `${father}.${item.key}`;
  switch (item.type) {
    case 'tree': {
      const renderedInnerItems = getRendering(item.children, key);
      const stringifiedItem = stringify(key, 'tree');
      return [...acc, stringifiedItem, renderedInnerItems];
    }
    default: {
      return getRenderedItemsByType(acc, item.type, key, item.oldValue, item.newValue);
    }
  }
}, []).join('\n');

const getOptionFilter = (option) => {
  switch (option) {
    case 'diff':
      return (item) => item.indexOf('not') === -1;
    default:
      return (item) => item.indexOf('not') !== -1;
  }
};

export default (data, option) => (option === 'complete' ? getRendering(data)
  : getRendering(data).split('\n')
    .filter(getOptionFilter(option))
    .join('\n'));
