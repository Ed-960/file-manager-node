import path from "path";
import fs from "fs/promises";
import process from "process";
import { argValidation } from "../utils/utils.js";

export const up = () => {
  process.chdir("..");
  console.log("directory has just been changed");
};

export const cd = (dirPath) => {
  if (!argValidation([dirPath], "Missing directory path")) {
    return;
  }

  try {
    process.chdir(path.resolve(dirPath));
    console.log(`directory has just been changed to ${path.resolve(dirPath)}`);
  } catch (err) {
    console.error("Invalid input.", err);
  }
};

export const ls = async () => {
  try {
    const list = await fs.readdir(path.resolve("./"), {
      withFileTypes: true,
    });
    const sorted = list
      .map((item) => ({
        Name: item.name,
        Type: item.isDirectory() ? "directory" : "file",
      }))
      .sort((a, b) =>
        a.Type === "directory" && b.Type === "file"
          ? -1
          : b.Type === "directory" && a.Type === "file"
          ? 1
          : a.Name.localeCompare(b.Name, undefined, {
              sensitivity: "base",
              numeric: true,
            })
      );
    console.table(sorted);
  } catch (err) {
    console.error("Error reading directory:", err.message);
  }
};
