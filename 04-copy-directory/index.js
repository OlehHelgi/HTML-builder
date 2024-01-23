const fs = require('fs');
const path = require('path');

function copyDir(callback) {
  const sourceDir = './04-copy-directory/files';
  const destinationDir = './04-copy-directory/files-copy';

  clearDirectory(destinationDir, (clearDirErr) => {
    if (clearDirErr) {
      return callback(clearDirErr);
    }
    fs.mkdir(destinationDir, { recursive: true }, (mkdirErr) => {
      if (mkdirErr) {
        return callback(mkdirErr);
      }
      fs.readdir(sourceDir, (readDirErr, files) => {
        if (readDirErr) {
          return callback(readDirErr);
        }
        const copyFile = (file, index) => {
          if (index === files.length) {
            console.log('Directory copied successfully.');
            return callback(null);
          }
          const sourcePath = path.join(sourceDir, file);
          const destinationPath = path.join(destinationDir, file);

          fs.stat(sourcePath, (statErr, stats) => {
            if (statErr) {
              return callback(statErr);
            }
            if (stats.isFile()) {
              fs.copyFile(sourcePath, destinationPath, (copyFileErr) => {
                if (copyFileErr) {
                  return callback(copyFileErr);
                }
                copyFile(files[index + 1], index + 1);
              });
            } else if (stats.isDirectory()) {
              copyDirRecursive(sourcePath, destinationPath, () => {
                copyFile(files[index + 1], index + 1);
              });
            }
          });
        };
        copyFile(files[0], 0);
      });
    });
  });
}
function copyDirRecursive(source, destination, callback) {
  fs.readdir(source, (readDirErr, files) => {
    if (readDirErr) {
      return callback(readDirErr);
    }
    const copyFile = (file, index) => {
      if (index === files.length) {
       return callback(null);
      }

      const sourcePath = path.join(source, file);
      const destinationPath = path.join(destination, file);

      fs.stat(sourcePath, (statErr, stats) => {
        if (statErr) {
          return callback(statErr);
        }
        if (stats.isFile()) {
          fs.copyFile(sourcePath, destinationPath, (copyFileErr) => {
            if (copyFileErr) {
              return callback(copyFileErr);
            }
            copyFile(files[index + 1], index + 1);
          });
        } else if (stats.isDirectory()) {
            copyDirRecursive(sourcePath, destinationPath, () => {
            copyFile(files[index + 1], index + 1);
          });
        }
      });
    };
    copyFile(files[0], 0);
  });
}
function clearDirectory(directory, callback) {
  fs.readdir(directory, (readDirErr, items) => {
    if (readDirErr) {
      if (readDirErr.code === 'ENOENT') {
        return callback(null);
      }
      return callback(readDirErr);
    }
    const deleteItem = (item, index) => {
      if (index === items.length) {
        return callback(null);
      }
      const itemPath = path.join(directory, item);

      fs.stat(itemPath, (statErr, stats) => {
        if (statErr) {
          return callback(statErr);
        }
        if (stats.isDirectory()) {
          clearDirectory(itemPath, () => {
            deleteItem(items[index + 1], index + 1);
          });
        } else {
          fs.unlink(itemPath, (unlinkErr) => {
            if (unlinkErr) {
              return callback(unlinkErr);
            }
            deleteItem(items[index + 1], index + 1);
          });
        }
      });
    };
    deleteItem(items[0], 0);
  });
}
copyDir((copyDirErr) => {
  if (copyDirErr) {
    console.error(`Error: ${copyDirErr.message}`);
  }
});


