import _ from 'lodash';
import parse from './parsers';


const getKeys = (data1, data2) => [...Object.keys(data1), ...Object.keys(data2)]
  .reduce((acc, key) => (acc.includes(key) ? acc : [...acc, key]), []);

const getDifference = (keys, data1, data2) => keys.reduce((acc, key) => {
  if (data1[key] === data2[key]) {
    const newItem = `    ${key}: ${data2[key]}`;
    return [...acc, newItem];
  }
  if (_.has(data1, key) && !_.has(data2, key)) {
    const newItem = `  - ${key}: ${data1[key]}`;
    return [...acc, newItem];
  }
  if (!_.has(data1, key) && _.has(data2, key)) {
    const newItem = `  + ${key}: ${data2[key]}`;
    return [...acc, newItem];
  }
  const newItem1 = `  + ${key}: ${data2[key]}`;
  const newItem2 = `  - ${key}: ${data1[key]}`;
  return [...acc, newItem1, newItem2];
}, []);

export default (firstConfig, secondConfig) => {
  const config1 = parse(firstConfig);
  // console.log(config1);
  const config2 = parse(secondConfig);
  // console.log(config2);
  const keysOfConfigFiles = getKeys(config1, config2);
  const difference = getDifference(keysOfConfigFiles, config1, config2);
  return `{\n${difference.join('\n')}\n}`;
};
