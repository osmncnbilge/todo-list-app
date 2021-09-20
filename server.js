import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import todoRoutes from "./backend/routes/todoRoutes.js";
import { mongoURI } from "./config/keys.js";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb Connected..."))
  .catch((e) => console.log(e));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
