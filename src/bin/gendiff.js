#!/usr/bin/env node

import program from 'commander';
import { version, description } from '../../package.json';
import genDiff from '..';

const printLineWith = (name) => console.log(`___________________________________${name}___________________________________`);

program
  .description(description)
  .version(`gendiff version: ${version}`, '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'simple')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, option) => {
    printLineWith('gendiff');
    const result = genDiff(firstConfig, secondConfig, option.format);
    console.log(result);
    printLineWith('gendiff');
    return result;
  })
  .parse(process.argv);
