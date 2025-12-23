const { readFile, writeFile } = require("node:fs/promises");

const DB_file = "./db.json";

const loadDB = async () => {
  try {
    const result = await readFile(DB_file, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeDB({});
    }
    return {};
  }
};

const writeDB = async (data) => {
  await writeFile(DB_file, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { loadDB, writeDB };
