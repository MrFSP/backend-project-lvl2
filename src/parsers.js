import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

const getFormat = (pathToFile) => path.extname(pathToFile);

const getData = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (pathToFile) => {
  const format = getFormat(pathToFile);
  const data = getData(pathToFile);
  return parsers[format](data);
};
