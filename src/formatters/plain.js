import _ from 'lodash';

const stringify = (prop, change, value, oldValue) => {
  const currValue = value !== undefined ? value : '[complex value]';
  const currOldValue = oldValue !== undefined ? oldValue : '[complex value]';
  switch (change) {
    case 'changed': {
      return `Property '${prop}' was changed from ${currOldValue} to ${currValue}`;
    }
    case 'added': {
      return `Property '${prop}' was added with value: ${currValue}`;
    }
    case 'deleted': {
      return `Property '${prop}' was deleted`;
    }
    case 'tree': {
      return `Property '${prop}' was changed`;
    }
    case 'equal': {
      return `Property '${prop}' was not changed`;
    }
    default: {
      throw new Error(`Type of change of property '${prop}' was not defined`);
    }
  }
};

const getRendering = (data, ancestry = '') => data.map((item) => {
  const {
    key, type, children, newValue, oldValue,
  } = item;
  const currentKey = ancestry === '' ? key : `${ancestry}.${key}`;
  switch (type) {
    case 'tree': {
      const renderedInnerItems = getRendering(children, currentKey);
      const stringifiedItem = stringify(currentKey, 'tree');
      return [stringifiedItem, renderedInnerItems].join('\n');
    }
    case 'deleted': {
      return stringify(currentKey, type);
    }
    case 'added': {
      return stringify(currentKey, type);
    }
    case 'changed': {
      if (_.isObject(oldValue) || _.isObject(newValue)) {
        const changedItem = stringify(currentKey, 'tree');
        const newItems = stringify(currentKey, 'added');
        return [changedItem, newItems].join('\n');
      }
      const changedItem = stringify(currentKey, type, newValue, oldValue);
      return changedItem;
    }
    case 'equal': {
      return stringify(currentKey, 'equal');
    }
    default: {
      return stringify(currentKey);
    }
  }
}).join('\n');

export default (data) => getRendering(data);
