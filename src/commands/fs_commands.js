import fs from "fs/promises";
import { argValidation } from "../utils/utils.js";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const cat = async (filePath) => {
  try {
    if (!argValidation([filePath], "Missing file path")) {
      throw new Error("Missing file path");
    }

    const stats = await fs.stat(filePath);

    if (!stats.isFile()) {
      throw new Error(`"${filePath}" is a directory, not a file.`);
    }

    const fileStream = createReadStream(filePath);

    fileStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    await new Promise((resolve, reject) => {
      fileStream.on("error", (err) => {
        reject(err);
      });

      fileStream.on("end", () => {
        resolve();
      });
    });
  } catch (err) {
    console.error("Failed to read file:", err.message);
    throw err;
  }
};

export const add = async (fileName) => {
  if (!argValidation([fileName])) {
    return;
  }

  try {
    await fs.writeFile(path.resolve(fileName), "");
    console.log("File created: ", path.resolve(fileName));
  } catch (err) {
    console.error("Invalid input.", err);
  }
};

export const rn = async (oldPath, newPath) => {
  try {
    if (!argValidation([oldPath, newPath, "Missing file paths"])) {
      throw new Error("Missing file paths");
    }
    await fs.rename(oldPath, newPath);
    console.log(`File renamed successfully from ${oldPath} to ${newPath}`);
  } catch (err) {
    console.error(`Failed to rename file: ${err.message}`);
    throw err;
  }
};

export const cp = async (filePath, copyFolder) => {
  if (!argValidation([filePath, copyFolder])) {
    return;
  }

  try {
    const rFilePath = path.resolve(filePath);
    const destinationFilePath = path.resolve(
      copyFolder,
      path.basename(filePath)
    );

    await fs.access(rFilePath);

    const readStream = createReadStream(rFilePath);
    const writeStream = createWriteStream(destinationFilePath, {
      flags: "w",
    });

    await pipeline(readStream, writeStream);

    console.log(`File copied successfully to ${destinationFilePath}`);
  } catch (error) {
    console.error("Invalid input.", error);
  }
};

export const mv = async (filePath, directoryPath) => {
  if (!argValidation([filePath, directoryPath])) {
    return;
  }

  try {
    const rFilePath = path.resolve(filePath);
    const rDirectory = path.resolve(directoryPath);

    await fs.access(rFilePath);
    const fileName = path.basename(rFilePath);
    const readStream = createReadStream(rFilePath);
    const writeStream = createWriteStream(path.join(rDirectory, fileName), {
      flags: "w",
    });

    await pipeline(readStream, writeStream);
    await fs.rm(path.resolve(filePath));
    console.log(`File ${fileName} moved to ${rDirectory} successfully.`);
  } catch (error) {
    console.error("Invalid input.", error);
  }
};

export const rm = async (filePath) => {
  if (!argValidation([filePath])) {
    return;
  }

  try {
    await fs.rm(path.resolve(filePath));
    console.log(`File ${filePath} was successfully deleted.`);
  } catch (error) {
    console.error("Invalid input.", error);
  }
};
