import express from 'express';
 
const app = express();
const port = 3022;
 
app.get('/', (req, res) => {
    res.send('<h1>Book Site API</h1>');
});
 
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});