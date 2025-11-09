#!/usr/bin/env node

import('../dist/cli/run.js').catch(err => {
  console.error('Error loading CLI:', err);
  process.exit(1);
});
