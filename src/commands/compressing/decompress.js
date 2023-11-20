import { createReadStream, createWriteStream } from "fs";
import path from "path";
import zlib from "zlib";
import { argValidation } from "../../utils/utils.js";

export const decompress = (filePath, outputFilePath) => {
  if (!argValidation([filePath, outputFilePath])) {
    return;
  }

  const inputStream = createReadStream(path.resolve(filePath));
  const outputStream = createWriteStream(path.resolve(outputFilePath));
  const gunzipStream = zlib.createBrotliDecompress({
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

  gunzipStream.on("error", (err) => {
    console.error(`Error decompressing data: ${err.message}`);
  });

  inputStream
    .pipe(gunzipStream)
    .on("error", (err) => {
      console.error(
        `Error piping data from input to decompression stream: ${err.message}`
      );
    })
    .pipe(outputStream)
    .on("error", (err) => {
      console.error(
        `Error piping decompressed data to output stream: ${err.message}`
      );
    });

  return new Promise((res, rej) => {
    outputStream.on("finish", () => {
      console.log(
        `File decompressed successfully. Result saved to ${outputFilePath}`
      );
      res();
    });

    outputStream.on("error", (err) => {
      rej(err);
    });
  });
};
