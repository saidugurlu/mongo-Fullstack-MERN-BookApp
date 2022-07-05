import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/Book.js";

mongoose.connect("mongodb://localhost/mongo-Fullstack-MERN-App-001");

const app = express();
const port = 3022;

app.get("/", (req, res) => {
  res.send("<h1>Book Site API</h1>");
});

app.post("/book", async (req, res) => {
  const book = new Book({
    title: "ttt",
    description: "ddd",
    numberOfPages: 999,
  });
  await book.save();

  console.log("book created: " + new Date());
  res.status(200).json({
    message: "book was created",
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
