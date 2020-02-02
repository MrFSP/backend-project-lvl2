import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile);

  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  }

  return parse(data);
};
