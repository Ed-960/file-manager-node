import fs from "fs/promises";
import path from "path";

export const ls = async (currentDirectory) => {
  try {
    const listDirectory = async (dir) => {
      const items = await fs.readdir(dir);
      const statsPromises = items.map((item) => fs.stat(path.join(dir, item)));
      const stats = await Promise.all(statsPromises);

      const files = [];
      const folders = [];

      stats.forEach((stat, index) => {
        const itemName = items[index];
        const itemPath = path.join(dir, itemName);
        const type = stat.isDirectory() ? "directory" : "file";
        const formattedItem = `${type}: ${itemName}`;

        if (stat.isDirectory()) {
          folders.push(formattedItem);
          listDirectory(itemPath);
        } else {
          files.push(formattedItem);
        }
      });

      const sortedFolders = folders.sort();
      const sortedFiles = files.sort();
      const sortedItems = sortedFolders.concat(sortedFiles);

      sortedItems.forEach((item) => console.log(item));
    };

    await listDirectory(currentDirectory);
  } catch (err) {
    console.error("Operation failed:", err.message);
  }
};

// start: npm run start -- --username SomeOne
// ls
