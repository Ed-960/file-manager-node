export const cat = (filePath) => {
  if (!checkArguments([filePath])) return;

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(path.resolve(filePath), "utf8");
    readStream.on("data", (chunk) => {
      console.log(chunk);
    });

    readStream.on("end", () => {
      resolve("");
    });

    readStream.on("error", (err) => {
      console.log("Invalid input.", err);
    });
  });
};
