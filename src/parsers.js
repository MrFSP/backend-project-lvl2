import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');

  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = ini.parse;
  }

  return parse(data);
};
