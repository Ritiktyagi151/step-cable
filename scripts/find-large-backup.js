const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../_legacy_unused_backup');
const threshold = 1 * 1024 * 1024; // 1 MB

function findLargeFiles(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file === '.next' || file === 'node_modules') continue;
      findLargeFiles(filePath, list);
    } else {
      if (stat.size >= threshold) {
        list.push({
          path: filePath,
          size: stat.size
        });
      }
    }
  }
  return list;
}

try {
  console.log(`Scanning ${backupDir} for files >= 1MB...`);
  const largeFiles = findLargeFiles(backupDir);
  console.log(`Found ${largeFiles.length} files:`);
  largeFiles.forEach(f => {
    console.log(`- ${path.relative(backupDir, f.path)} (${(f.size / 1024 / 1024).toFixed(2)} MB)`);
  });
} catch (e) {
  console.error('Error scanning backup directory:', e.message);
}
