const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const projectDistPath = path.join(__dirname, 'project-dist');

fs.mkdir(projectDistPath, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, templateFile) => {
  if (err) {
    console.error(err);
    return;
  }

  const tagNames = new Set();
  templateFile.split('\n').forEach((line) => {
    const match = line.match(/{{[a-zA-Z0-9_-]+}}/g);
    if (match) {
      tagNames.add(match[0].slice(2, -2));
    }
  });

  const components = {};
  tagNames.forEach((tagName) => {
    fs.readFile(`${componentsPath}/${tagName}.html`, 'utf-8', (err, componentFile) => {
      if (err) {
        console.error(err);
        return;
      }

      components[tagName] = componentFile;
    });
  });

  const replacedTemplate = templateFile.replace(/{{[a-zA-Z0-9_-]+}}/g, (match) => {
    const tagName = match.slice(2, -2);
    return components[tagName];
  });

  fs.writeFile(path.join(projectDistPath, 'index.html'), replacedTemplate, 'utf-8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    const styleFile = require('./05-merge-styles')();
    const assets = require('./04-copy-directory')(assetsPath, projectDistPath);
  });
});