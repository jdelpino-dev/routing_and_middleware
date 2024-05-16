/**
 * Express application setup.
 * This module sets up the Express application, middleware, and routes.
 */

import express from "express";
import morgan from "morgan";
import itemsRouter from "./routes/items.js";

const app = express();

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes for handling items
app.use("/items", itemsRouter);

// Fallback Middleware for not-found and json parsing errors
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    res.status(400).json({ error: "Invalid JSON" });
  } else {
    next(err);
  }
});

// Generic Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode);

  if (statusCode === 500) {
    return res.json({
      error: "Internal Server Error",
    });
  }

  return res.json({
    error: err.message,
  });
});

export default app;
