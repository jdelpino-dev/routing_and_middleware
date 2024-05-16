/**
 * Items route module.
 * This module defines the routes for managing shopping list items.
 */

import express from "express";
import validateItem from "../middleware/validateItem.js";
import { readData, writeData } from "../utils/dataStore.js";

const router = express.Router();

/**
 * GET /items
 * Fetches the list of all shopping items.
 */
router.get("/items", (req, res) => {
  const items = readData();
  res.json(items);
});

/**
 * POST /items
 * Adds a new item to the shopping list.
 * Expects a JSON object with 'name' and 'price'.
 */
router.post("/items", validateItem, (req, res) => {
  const items = readData();
  const newItem = req.body;
  items.push(newItem);
  writeData(items);
  res.status(201).json({ added: newItem });
});

/**
 * GET /items/:name
 * Fetches a single item by name.
 */
router.get("/items/:name", (req, res) => {
  const items = readData();
  const item = items.find((i) => i.name === req.params.name);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

/**
 * PATCH /items/:name
 * Updates a single item's name and/or price.
 * Expects a JSON object with the updated 'name' and/or 'price'.
 */
router.patch("/items/:name", validateItem, (req, res) => {
  const items = readData();
  const itemIndex = items.findIndex((i) => i.name === req.params.name);
  if (itemIndex !== -1) {
    const updatedItem = { ...items[itemIndex], ...req.body };
    items[itemIndex] = updatedItem;
    writeData(items);
    res.json({ updated: updatedItem });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

/**
 * DELETE /items/:name
 * Deletes a single item by name.
 */
router.delete("/items/:name", (req, res) => {
  const items = readData();
  const itemIndex = items.findIndex((i) => i.name === req.params.name);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    writeData(items);
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

export default router;
