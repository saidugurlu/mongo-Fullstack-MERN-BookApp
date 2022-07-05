import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

const url = 'http://localhost:3022';

function App() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		(async () => {
			const _books = (await axios.get(`${url}/book`)).data.books;
			setBooks(_books);
		})();
	}, []);

	return (
		<div className="App">
			<h1>Book Site</h1>

			<p>There are {books.length} books.</p>

			<div className="books">
				{books.map((book, i) => {
					return (
						<div className="book">
              <img src={book.imageUrl}/>
              <div className="info">
							<div className="title">{book.title}</div>
              <div className="description">{book.description}</div>
              </div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;