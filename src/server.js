/**
 * Server entry point.
 * This module starts the Express server.
 */

import app from "./app.js";

const PORT = 3300;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
