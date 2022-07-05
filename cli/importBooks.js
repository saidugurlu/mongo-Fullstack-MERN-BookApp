import mongoose from "mongoose";
import { Book } from "../models/Book.js";
import axios from "axios";

mongoose.connect("mongodb://localhost/mongo-Fullstack-MERN-App-001");

const url = "https://edwardtanguay.netlify.app/share/books.json";

console.log("connected to mongoose");

const rawBooks = (await axios.get(url)).data;

for (const rawBook of rawBooks) {
  console.log(`processing ${rawBook.title}...`);
  const book = new Book({
    title: rawBook.title,
    description: rawBook.description,
    numberOfPages: Number(rawBook.totalpages),
    language: rawBook.language,
    imageUrl: `http://edwardtanguay.netlify.app/share/images/books/${rawBook.idcode}.png`,
    buyUrl: rawBook.buyUrl,
  });
console.log(book);
  await book.save();
}

console.log("imported completed");
process.exit(1);

// Bu file/cli ile baska bir API den veri cekip kendi uygulamamiza yüklüyoruz.
