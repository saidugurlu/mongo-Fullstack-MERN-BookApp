import mongoose from 'mongoose';
import { Book } from '../models/Book.js';
 
mongoose.connect('mongodb://localhost/bookapi');
 
console.log('connected to mongoose')
 
const book = new Book({
    title: 'tttimported',
    description: 'dddimported',
    numberOfPages: 555
});
await book.save();
console.log('imported completed');
process.exit(1);