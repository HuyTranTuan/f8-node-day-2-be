const { readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");

const DB_file = path.join(__dirname, "..", "db.json");

const loadDB = async () => {
  try {
    const result = await readFile(DB_file, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    if (error.code === "ENOENT") {
      await saveDB({ posts: [], comments: [] });
    }
    return { posts: [], comments: [] };
  }
};

const saveDB = async (data) => {
  await writeFile(DB_file, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { loadDB, saveDB };
