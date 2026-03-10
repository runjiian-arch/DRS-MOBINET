const fs = require('fs');
const path = require('path');

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const requireRegex = /require\(['"](.+?)['"]\)/g;
  let match;
  const missing = [];

  while ((match = requireRegex.exec(content)) !== null) {
    let reqPath = match[1];

    // Only check local files
    if (reqPath.startsWith('.')) {
      const fullPath = path.resolve(path.dirname(filePath), reqPath);
      const existsJs = fs.existsSync(fullPath + '.js');
      const existsIndexJs = fs.existsSync(path.join(fullPath, 'index.js'));

      if (!existsJs && !existsIndexJs) {
        missing.push(reqPath + ' (required in ' + filePath + ')');
      }
    }
  }

  return missing;
}

function scanDir(dir) {
  let files = fs.readdirSync(dir);
  let allMissing = [];

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      allMissing = allMissing.concat(scanDir(fullPath));
    } else if (file.endsWith('.js')) {
      const missing = scanFile(fullPath);
      allMissing = allMissing.concat(missing);
    }
  });

  return allMissing;
}

// Run scan on project root
const missingFiles = scanDir(__dirname);

if (missingFiles.length === 0) {
  console.log('✅ All local modules/files are present!');
} else {
  console.log('❌ Missing modules/files detected:');
  missingFiles.forEach(f => console.log(f));
}
