import fs from "fs";
import crypto from "crypto";
import path from "path";
import { argValidation } from "../utils/utils.js";

export const toHash = (filePath) => {
  if (!argValidation([filePath])) {
    return;
  }

  const fileStream = fs.createReadStream(path.resolve(filePath));
  const hash = crypto.createHash("sha256");

  fileStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  fileStream.on("end", () => {
    const hex = hash.digest("hex");
    console.log(hex);
  });

  fileStream.on("error", (err) => {
    console.error(err);
  });
};
