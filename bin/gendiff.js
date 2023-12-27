#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .version('', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.');

program.parse();
