import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

const url = 'http://localhost:3022';

function App() {
	const [books, setBooks] = useState([]);
  const [fieldTitle, setFieldTitle] = useState('');

	useEffect(() => {
		(async () => {
			const _books = (await axios.get(`${url}/book`)).data.books;
			_books.forEach((book) => {
				book.editPanelShowing = false;
			});
			setBooks(_books);
		})();
	}, []);

	const handleButtonDelete = async (e, book) => {
		const deleteUrl = `${url}/book/${book._id}`;
		await axios.delete(deleteUrl);
		const _books = books.filter((m) => m._id !== book._id);
		setBooks(_books);
	};

	const handleButtonEdit = async (e, book) => {
		book.editPanelShowing = true;
    setFieldTitle(book.title);
		setBooks([...books]);
	};

	const handleButtonClear = async (e, book) => {
		book.editPanelShowing = false;
    setFieldTitle('');
		setBooks([...books]);
	};

	const handleButtonSave = async (e, book) => {
		book.editPanelShowing = false;
    book.title = fieldTitle;
  
		const putUrl = `${url}/book/${book._id}`;
    await axios.put(putUrl, {
      title: book.title
    });

    setFieldTitle('');
		setBooks([...books]);
	};

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
									<button
                  disabled={book.editPanelShowing}
										onClick={(e) =>
											handleButtonEdit(e, book)
										}
									>
										Edit
									</button>
								</div>
								{book.editPanelShowing && (
									<>
										<div className="editPanel">
                      <div className="row">
                        Title: <input value={fieldTitle} onChange={(e) => setFieldTitle(e.target.value)} />
                      </div>
                      <div className="innerButtons">
											<button
												onClick={(e) =>
													handleButtonClear(e, book)
												}
											>
												Clear
											</button>
											<button
												onClick={(e) =>
													handleButtonSave(e, book)
												}
											>
												Save
											</button>
                      </div>
										</div>
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;