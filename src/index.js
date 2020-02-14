import parse from './parsers';
import { getDifference } from './getdifference';
import getFormatter from './formatters';

export default (firstConfig, secondConfig, format) => {
  const data1 = parse(firstConfig);
  const data2 = parse(secondConfig);
  const difference = getDifference(data1, data2);
  const render = getFormatter(format);
  return render(difference);
};
