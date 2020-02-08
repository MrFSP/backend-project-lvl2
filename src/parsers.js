import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

const parse = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return parse[format](data);
};
