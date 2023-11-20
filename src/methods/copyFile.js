import { createReadStream, createWriteStream } from "fs";
import path from "path";

export const copyFile = (sourcePath, destinationPath) => {
  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  sourceStream.on("error", (err) => {
    console.log(
      `Error reading file ${path.basename(sourcePath)}: ${err.message}`
    );
  });

  destinationStream.on("error", (err) => {
    console.log(
      `Error writing file ${path.basename(destinationPath)}: ${err.message}`
    );
  });

  destinationStream.on("finish", () => {
    console.log("File copied successfully!");
  });

  sourceStream.pipe(destinationStream);
};
