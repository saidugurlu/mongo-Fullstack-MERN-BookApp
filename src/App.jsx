import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

const url = 'http://localhost:3459';

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
		</div>
	);
}

export default App;