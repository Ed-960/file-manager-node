import os from "os";
import { cd, ls, up } from "../commands/nwd.js";
import { add, cat, cp, mv, rm, rn } from "../commands/fs_commands.js";
import { osGetInfo } from "../commands/os_commands.js";
import { toHash } from "../commands/hash.js";
import { compress } from "../commands/compressing/compress.js";
import { decompress } from "../commands/compressing/decompress.js";

export const getUsername = () => {
  const usernameRegex = /--username=(\w+)/;
  const usernameArg = process.argv.find((el) => el.match(usernameRegex));

  if (usernameArg) {
    const match = usernameArg.match(usernameRegex);
    return match[1];
  } else {
    console.error("Username not provided. Please use --username=your_username");
    process.exit(1);
  }
};

export const onCommand = (command, ...args) => {
  switch (command) {
    case "ls":
      ls();
      break;
    case "up":
      up();
      break;
    case "cd":
      cd(args[0]);
      break;
    case "cat":
      cat(args[0]);
      break;
    case "add":
      add(args[0]);
      break;
    case "rn":
      rn(...args);
      break;
    case "cp":
      cp(...args);
      break;
    case "mv":
      mv(...args);
      break;
    case "rm":
      rm(...args);
      break;
    case "os":
      osGetInfo(...args);
      break;
    case "hash":
      toHash(...args);
      break;
    case "compress":
      compress(...args);
      break;
    case "decompress":
      decompress(...args);
      break;
    default:
      console.log("Invalid command");
  }
};

export const argValidation = (args, message = "") => {
  if (args.includes(undefined) || args.includes(null) || args.includes("")) {
    if (message) {
      console.error(message);
    } else if (args.length === 1) {
      console.error("Invalid input. Argument must be provided");
    } else {
      console.error(
        `Invalid input. All ${args.length} arguments must be provided`
      );
    }

    return false;
  }
  return true;
};

export const currentDir = () => {
  const currentDirectory = process.cwd();
  console.log(`You are currently in ${currentDirectory}`);
};

export const redirecHome = () => {
  process.chdir(os.homedir());
};
