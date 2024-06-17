const { chmodSync } = require('fs');
const { join } = require('path');

const entrypointPath = join(process.cwd(), 'entrypoint.sh');
chmodSync(entrypointPath, '755');

console.log('Permissions set for entrypoint.sh');
