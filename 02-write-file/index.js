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
    console.log("Good bye!");
    readConsole.close();
    writeStream.close();
    return;
  }
  writeStream.write(`${line}\n`);
 });
process.on('SIGINT', sayGoodBye);
function sayGoodBye() {
  console.log('Good bye!');
  readConsole.close();
  writeStream.close();
}

readConsole.on('close', () => process.exit(0));