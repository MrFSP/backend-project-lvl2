import parse from './parsers';
import { getDifference } from './makediff';
import formatter from './formatters';

export default (firstConfig, secondConfig, option) => {
  const data1 = parse(firstConfig);
  const data2 = parse(secondConfig);
  const difference = getDifference(data1, data2);
  const render = formatter(option);
  return render(difference);
};
