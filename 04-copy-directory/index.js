const fs = require('fs');
const path = require('path');

function copyDir() {
  const sourceDir = './04-copy-directory/files';
  const destinationDir = './04-copy-directory/files-copy';

  fs.mkdir(destinationDir, { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      return;
    }
    fs.readdir(sourceDir, (readErr, files) => {
      if (readErr) {
        return;
      }

      files.forEach((file) => {
        const sourcePath = path.join(sourceDir, file);
        const destinationPath = path.join(destinationDir, file);

        fs.copyFile(sourcePath, destinationPath, (copyErr) => {
          if (copyErr) {
            return;
          }
        });
      });
    });
  });
}
copyDir();