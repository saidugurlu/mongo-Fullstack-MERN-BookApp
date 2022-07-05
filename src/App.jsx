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

  const handleButtonDelete = async (e, book) => {
    const deleteUrl = `${url}/book/${book._id}`;
    const res = await axios.delete(deleteUrl);
  }

	return (
		<div className="App">
			<h1>Book Site</h1>

			<p>There are {books.length} books.</p>

			<div className="books">
				{books.map((book, i) => {
					return (
						<div key={i} className="book">
							<img src={book.imageUrl} />
							<div className="info">
								<div className="title">{book.title}</div>
								<div className="description">
									{book.description}
								</div>
								<div className="buttons">
									<button
										onClick={(e) =>
											handleButtonDelete(e, book)
										}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;