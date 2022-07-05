import express from 'express';
import mongoose from 'mongoose';
 
mongoose.connect('mongodb://localhost/mongo-Fullstack-MERN-App-001');
 
const app = express();
const port = 3022;
 
app.get('/', (req, res) => {
    res.send('<h1>Book Site API</h1>');
});
 
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});