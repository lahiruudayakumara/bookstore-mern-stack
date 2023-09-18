import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World!");
});

app.post("/books", async (req, res) => {
  try {
    if(
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: "Please fill all required fields" });
    };
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
  };

  const book = await Book.create(newBook);

  return res.status(201).send(book);
} catch (error) {
  console.log(error);
  res.status(500).send({ message: error.message });
}
});

mongoose
.connect(mongoDBURL)
.then(() => {
  console.log("MongoDB Connected😁");
  app.listen(PORT, () => {
    console.log(`🚀Server listening on port: ${PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});