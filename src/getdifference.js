import _ from 'lodash';

export const isObject = (data) => typeof (data) === 'object';

const getSortedKeys = (data1, data2) => _.union(Object.keys(data1), Object.keys(data2)).sort();

const getObject = (data1, data2, key) => {
  if (data1[key] === data2[key]) {
    return {
      key, type: 'equal', oldValue: data1[key], newValue: data2[key],
    };
  }
  if (!_.has(data1, key)) {
    return { key, type: 'added', newValue: data2[key] };
  }
  if (!_.has(data2, key)) {
    return { key, type: 'deleted', newValue: data1[key] };
  }
  return {
    key, type: 'changed', oldValue: data1[key], newValue: data2[key],
  };
};

export const getDifference = (data1, data2) => getSortedKeys(data1, data2).map((key) => {
  if (isObject(data1[key]) && isObject(data2[key])) {
    return { key, type: 'tree', children: getDifference(data1[key], data2[key]) };
  }
  return getObject(data1, data2, key);
});
