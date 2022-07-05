import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/Book.js';

mongoose.connect("mongodb://localhost/mongo-Fullstack-MERN-App-001");

const app = express();
const port = 3022;

app.use(express.json());

app.get('/', (req, res) => {
	res.send(`<h1>Book API</h1>`);
});

app.post('/book', async (req, res) => {
	const book = new Book(req.body);
	await book.save();
	res.status(200).json({
		"message": "book created",
		book
	});
});


app.get('/book', async (req, res) => {
    const books = await Book.find();
    res.status(200).json({ message: 'all books', books });
});


app.listen(port, () => {
	console.log(`listening on port: http://localhost:${port}`);
});