import renderSimple from './simple';
import renderPlain from './plain';
import renderJson from './json';

const formatter = {
  simple: renderSimple,
  plain: renderPlain,
  json: renderJson,
};

export default (format) => formatter[format];
