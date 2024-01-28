#!/usr/bin/env node

import { program } from 'commander';
import parser from '../src/index.js';

program
  .name('gendiff')
  .version('', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f --format <type>', 'output format: stylish, plain, json', 'stylish')
  .action(parser);

program.parse();
