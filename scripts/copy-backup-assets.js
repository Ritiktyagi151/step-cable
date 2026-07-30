const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../_legacy_unused_backup');
const publicDir = path.join(__dirname, '../public');

// Supported extensions
const imgExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
const videoExtensions = ['.mp4', '.webm', '.ogv', '.mov'];

function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (fs.statSync(src).isDirectory()) {
    if (path.basename(src) === '.next' || path.basename(src) === 'node_modules') return;
    
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    for (const file of files) {
      copyFolderRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    const ext = path.extname(src).toLowerCase();
    if (imgExtensions.includes(ext) || videoExtensions.includes(ext)) {
      // Ensure target directory exists
      const targetDir = path.dirname(dest);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Copy file
      fs.copyFileSync(src, dest);
      console.log(`Copied: ${path.relative(backupDir, src)} -> ${path.relative(publicDir, dest)}`);
    }
  }
}

try {
  console.log('Copying images and videos from backup folders...');
  
  // Try copying assets folder first
  const srcAssets = path.join(backupDir, 'assets');
  const destAssets = path.join(publicDir, 'assets');
  if (fs.existsSync(srcAssets)) {
    copyFolderRecursive(srcAssets, destAssets);
  }
  
  // Try copying assetshome folder
  const srcAssetsHome = path.join(backupDir, 'assetshome');
  const destAssetsHome = path.join(publicDir, 'assetshome');
  if (fs.existsSync(srcAssetsHome)) {
    copyFolderRecursive(srcAssetsHome, destAssetsHome);
  }
  
  // Try copying images folder
  const srcImages = path.join(backupDir, 'images');
  const destImages = path.join(publicDir, 'images');
  if (fs.existsSync(srcImages)) {
    copyFolderRecursive(srcImages, destImages);
  }

  // Try copying wiresforhome folder
  const srcWires = path.join(backupDir, 'wiresforhome');
  const destWires = path.join(publicDir, 'wiresforhome');
  if (fs.existsSync(srcWires)) {
    copyFolderRecursive(srcWires, destWires);
  }
  
  console.log('Assets copy completed successfully!');
} catch (e) {
  console.error('Error during copy process:', e.message);
}
