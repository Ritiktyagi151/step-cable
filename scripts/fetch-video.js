const fs = require('fs');
const path = require('path');
const https = require('https');

const videoDir = path.join(__dirname, '../public/assets/video');
const dest = path.join(videoDir, 'connect.mp4');

// Ensure video directory exists
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

const file = fs.createWriteStream(dest);
const videoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const requestOptions = {
  rejectUnauthorized: false,
};

console.log(`Downloading video from: ${videoUrl}...`);

https.get(videoUrl, requestOptions, (response) => {
  if (response.statusCode && response.statusCode >= 400) {
    file.close();
    fs.unlink(dest, () => {});
    console.error(`Error downloading video: HTTP ${response.statusCode}`);
    process.exitCode = 1;
    return;
  }

  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Video downloaded successfully and saved to public/assets/video/connect.mp4');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {}); // delete the file on error
  console.error(`Error downloading video: ${err.message}`);
});
