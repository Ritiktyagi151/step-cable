const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../_legacy_unused_backup');
const extensions = ['.mp4', '.webm', '.ogv', '.mov', '.png', '.jpg', '.jpeg', '.gif', '.svg'];

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Skip some huge folders like node_modules or .next if present inside
      if (file === '.next' || file === 'node_modules') continue;
      scanDir(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
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
  console.log('Scanning backup directory for assets...');
  const assets = scanDir(backupDir);
  console.log(`Found ${assets.length} asset files.`);
  
  // Print video files specifically
  const videos = assets.filter(a => ['.mp4', '.webm', '.ogv', '.mov'].includes(path.extname(a.name).toLowerCase()));
  console.log(`\nVideos found (${videos.length}):`);
  videos.forEach(v => console.log(`- ${path.relative(backupDir, v.path)} (${(v.size / 1024 / 1024).toFixed(2)} MB)`));

  // Print summary of images
  const images = assets.filter(a => !['.mp4', '.webm', '.ogv', '.mov'].includes(path.extname(a.name).toLowerCase()));
  console.log(`\nImages found (${images.length}). Showing first 15:`);
  images.slice(0, 15).forEach(img => console.log(`- ${path.relative(backupDir, img.path)} (${(img.size / 1024).toFixed(1)} KB)`));
} catch (e) {
  console.error('Error scanning backup dir:', e);
}
