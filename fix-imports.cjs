const fs = require('fs');
const path = require('path');

function updateImports(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      updateImports(fullPath);
    } else if (path.extname(fullPath) === '.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content.replace(/(from\s+['"])(\..*?)(?<!\.js)(['"])/g, '$1$2.js$3');
      if (newContent !== content) {
        console.log(`Updating imports in: ${fullPath}`);
        fs.writeFileSync(fullPath, newContent, 'utf8');
      }
    }
  });
}

const distDir = path.join(__dirname, 'dist');
updateImports(distDir);
console.log('Imports updated successfully.');
