import { createReadStream, createWriteStream } from "fs";
import path from "path";
import zlib from "zlib";
import { argValidation } from "../../utils/utils.js";

export const compress = (filePath, outputFilePath) => {
  if (!argValidation([filePath, outputFilePath])) {
    return;
  }

  const inputStream = createReadStream(path.resolve(filePath));
  const outputStream = createWriteStream(path.resolve(outputFilePath));
  const gzipStream = zlib.createBrotliCompress({
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    },
  });
  inputStream.on("error", (err) => {
    console.error(`Error reading input file: ${err.message}`);
  });

  outputStream.on("error", (err) => {
    console.error(`Error creating output file: ${err.message}`);
  });

  gzipStream.on("error", (err) => {
    console.error(`Error compressing data: ${err.message}`);
  });

  inputStream
    .pipe(gzipStream)
    .on("error", (err) => {
      console.error(
        `Error piping data from input to compression stream: ${err.message}`
      );
    })
    .pipe(outputStream)
    .on("error", (err) => {
      console.error(
        `Error piping compressed data to output stream: ${err.message}`
      );
    });

  return new Promise((res, rej) => {
    outputStream.on("finish", () => {
      console.log(
        `File compressed successfully. Result saved to ${outputFilePath}`
      );
      res();
    });

    outputStream.on("error", (err) => {
      rej(err);
    });
  });
};
