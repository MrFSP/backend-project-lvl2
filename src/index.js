import _ from 'lodash';
import fs from 'fs';

const getConfig = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return JSON.parse(data);
};

const getKeys = (data1, data2) => [...Object.keys(data1), ...Object.keys(data2)]
  .reduce((acc, key) => (acc.includes(key) ? acc : [...acc, key]), []);

const getDifference = (keys, data1, data2) => keys.reduce((acc, key) => {
  if (data1[key] === data2[key]) return [...acc, `    ${key}: ${data2[key]}`];

  if (_.has(data1, key) && !_.has(data2, key)) return [...acc, `  - ${key}: ${data1[key]}`];

  if (!_.has(data1, key) && _.has(data2, key)) return [...acc, `  + ${key}: ${data2[key]}`];

  return [...acc, `  + ${key}: ${data2[key]}`, `  - ${key}: ${data1[key]}`];
}, []);

export default (firstConfig, secondConfig) => {
  const config1 = getConfig(firstConfig);
  const config2 = getConfig(secondConfig);
  const keysOfConfigFiles = getKeys(config1, config2);
  const difference = getDifference(keysOfConfigFiles, config1, config2);
  return `{\n${difference.join('\n')}\n}`;
};
