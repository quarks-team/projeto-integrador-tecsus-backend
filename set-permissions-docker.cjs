const { chmodSync } = require('fs');
const { join } = require('path');

// Paths to the scripts
const scripts = [
  join('/usr/local/bin', 'entrypoint.sh'),
  join('/usr/local/bin', 'healthcheck.sh')
];

// Make the scripts executable
scripts.forEach(script => {
  chmodSync(script, '755');
  console.log(`Permissions set for ${script}`);
});
