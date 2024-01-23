const fs = require('fs');
const path = require('path');
const folderPath = './03-files-in-folder/secret-folder';

function displayFileInfo() {
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          return;
        }
        if (file.isFile()) {
          const fileSizeInKB = (stats.size / 1024).toFixed(2);
          console.log(`${file.name}-${path.extname(file.name).slice(1)}-${fileSizeInKB}kb`);
        }
      });
    });
  });
}
displayFileInfo();