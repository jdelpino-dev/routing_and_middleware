import fs from "fs";
import path from "path";

/**
 * Data store utility functions.
 * These functions handle reading from and writing
 * to a JSON file for persistent storage of shopping list items.
 */

const filePath = path.join(__dirname, "../../data.json");

/**
 * Reads data from the JSON file.
 * @returns {Array} The array of items read from the JSON file.
 */
const readData = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

/**
 * Writes data to the JSON file.
 * @param {Array} data - The array of items to write to the JSON file.
 */
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export { readData, writeData };
