import Express from "express";
import { PORT } from "./config.js";

const app = Express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});