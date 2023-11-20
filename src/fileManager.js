import readline from "readline/promises";
import process from "process";
import {
  currentDir,
  getUsername,
  onCommand,
  redirecHome,
} from "./utils/utils.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = getUsername();
console.log(`Welcome to the File Manager, ${username}!`);

redirecHome();
currentDir();

rl.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ");

  if (input === ".exit") {
    return rl.close();
  }

  onCommand(command, ...args);
  currentDir();
});

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});
