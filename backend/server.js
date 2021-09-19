import express from "express";
import data from "./data.js";

const app = express();

app.get("/", (req, res) => {
  res.send(data.todos);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});