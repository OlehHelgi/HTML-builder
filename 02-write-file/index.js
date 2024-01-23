const fs = require("fs");
const readline = require('readline');
const pathToFile = '02-write-file/your-message.txt';
const welcome = 'Welcome! Please, write your message or type "exit" to quit.';
const writeStream = fs.createWriteStream(pathToFile);

console.log(welcome);

const readConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readConsole.on('line', (line) => {
  if (line.trim() === 'exit') {
    console.log("Goodbye!");
    readConsole.close();
    writeStream.close();
    return;
  }
  writeStream.write(`${line}\n`);
 });

process.on('exit', () => {
  writeStream.close();
  console.log('Goodbye!\n');
});

process.on('SIGINT', () => process.exit());