/**
 * Middleware to validate item data.
 * Ensures that each item has a name (string) and price (number).
 */

const validateItem = (req, res, next) => {
  const { name, price } = req.body;
  if (typeof name !== "string" || typeof price !== "number") {
    return res.status(400).json({ error: "Invalid item format" });
  }
  next();
};

export default validateItem;
