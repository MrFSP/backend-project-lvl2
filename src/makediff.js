import _ from 'lodash';

const getKeys = (data1, data2) => _.union(Object.keys(data1), Object.keys(data2));

export const isObject = (data) => typeof (data) === 'object';

export const getDifference = (data1, data2) => {
  const keys = getKeys(data1, data2);
  return keys.sort()
    .map((key) => {
      if (isObject(data1[key]) && isObject(data2[key])) {
        return {
          key,
          type: 'objects',
          children: getDifference(data1[key], data2[key]),
        };
      }
      if (data1[key] === data2[key]) {
        return {
          key,
          type: 'equal',
          oldValue: data1[key],
          newValue: data2[key],
        };
      }
      if (!_.has(data1, key)) {
        return {
          key,
          type: 'added',
          newValue: data2[key],
        };
      }
      if (!_.has(data2, key)) {
        return {
          key,
          type: 'deleted',
          newValue: data1[key],
        };
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
        return {
          key,
          type: 'changed',
          oldValue: data1[key],
          newValue: data2[key],
        };
      }
      return null;
    }).sort();
};
