import readline from "readline";
import { ls } from "./src/methods/ls.js";
import { cat } from "./src/methods/cat.js";
import path from "path";
import { copyFile } from "./src/methods/copyFile.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentDirectory = process.cwd();
const username = process.argv[3];

const printCurrentDirectory = () => {
  console.log(`You are currently in ${currentDirectory}`);
};

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();

// Handle user input and execute corresponding functions

rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");

  switch (command) {
    case "ls":
      ls(currentDirectory);
      break;
    case "cat":
      const filePath = path.resolve(currentDirectory, args[0]);
      cat(filePath);
      break;
    case "cp":
      const source = path.resolve(currentDirectory, args[0]);
      const destination = path.resolve(currentDirectory, args[1]);
      copyFile(source, destination);
      break;
    default:
      console.log("Invalid command");
  }
});

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});
