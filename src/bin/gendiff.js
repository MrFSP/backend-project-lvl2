#!/usr/bin/env node

import program from 'commander';
import { version, description } from '../../package.json';
import genDiff from '..';

try {
  program
    .description(description)
    .version(`gendiff version: ${version}`, '-v, --version', 'output the version number')
    .option('-f, --format [type]',
      'Choose output format.\n\t\t       Types: simple, plain, json.\n\t\t      ', 'simple')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig, option) => console.log(genDiff(firstConfig,
      secondConfig, option.format)))
    .parse(process.argv);
} catch (error) {
  console.log(error);
}
