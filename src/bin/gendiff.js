#!/usr/bin/env node

const program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')  
  .version('0.0.1', '-V, --vers', 'output the version number')
  .on('--help', function() {});

program.parse(process.argv);
