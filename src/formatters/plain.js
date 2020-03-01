import _ from 'lodash';

const getValue = (value) => (!_.isObject(value) ? value : '[complex value]');

const getRendering = (data, ancestry = '') => data.map((item) => {
  const {
    key, type, children, newValue, oldValue,
  } = item;
  const currentKey = ancestry === '' ? key : `${ancestry}.${key}`;
  switch (type) {
    case 'tree': {
      const renderedInnerItems = getRendering(children, currentKey);
      const stringifiedItem = `Property '${currentKey}' was changed`;
      return [stringifiedItem, renderedInnerItems].join('\n');
    }
    case 'deleted': {
      return `Property '${currentKey}' was deleted`;
    }
    case 'added': {
      const currValue = getValue(newValue);
      return `Property '${currentKey}' was added with value: ${currValue}`;
    }
    case 'changed': {
      const currNewValue = getValue(newValue);
      const currOldValue = getValue(oldValue);
      return `Property '${currentKey}' was changed from ${currOldValue} to ${currNewValue}`;
    }
    case 'equal': {
      return `Property '${currentKey}' was not changed`;
    }
    default: {
      throw new Error(`ERROR! Unexpected value of property 'type': '${type}'!`);
    }
  }
}).join('\n');

export default (data) => getRendering(data);
