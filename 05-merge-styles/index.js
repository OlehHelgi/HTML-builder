const fs = require('fs');
const path = require('path');

function mergeStyles() {
  const stylesFolderPath = './05-merge-styles/styles';
  const distFolderPath = './05-merge-styles/project-dist';
  const outputFileName = 'bundle.css';

  fs.readdir(stylesFolderPath, (readDirErr, files) => {
    const cssFiles = files.filter(file => path.extname(file) === '.css');

    const stylesArray = [];
    let processedCount = 0;

    cssFiles.forEach((file) => {
      const filePath = path.join(stylesFolderPath, file);

      fs.readFile(filePath, 'utf-8', (readFileErr, fileContent) => {
        stylesArray.push(fileContent);
        processedCount++;

        if (processedCount === cssFiles.length) {
          fs.mkdir(distFolderPath, { recursive: true }, () => {
            const outputPath = path.join(distFolderPath, outputFileName);
            fs.writeFile(outputPath, stylesArray.join('\n'), 'utf-8', () => {
              console.log('CSS bundle created successfully.');
            });
          });
        }
      });
    });
  });
}

mergeStyles();