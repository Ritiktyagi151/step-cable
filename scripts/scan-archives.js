const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../_legacy_unused_backup');
const archiveExtensions = ['.zip', '.rar', '.tar', '.gz', '.tgz', '.7z', '.mp4', '.webm', '.mov', '.avi'];

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file === '.next' || file === 'node_modules') continue;
      scanDir(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      const name = file.toLowerCase();
      if (archiveExtensions.includes(ext) || name.includes('video') || name.includes('movie') || name.includes('mp4')) {
        fileList.push({
          name: file,
          path: filePath,
          size: stat.size
        });
      }
    }
  }
  return fileList;
}

try {
  console.log('Scanning for videos/archives in backup directory...');
  const files = scanDir(backupDir);
  console.log(`Found ${files.length} matching files:`);
  files.forEach(f => {
    console.log(`- ${path.relative(backupDir, f.path)} (${(f.size / 1024 / 1024).toFixed(2)} MB)`);
  });
} catch (e) {
  console.error('Error:', e);
}
