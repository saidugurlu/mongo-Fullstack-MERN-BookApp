import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

const url = 'http://localhost:3022';

function App() {
	const [books, setBooks] = useState([]);
	const [fieldTitle, setFieldTitle] = useState('');
	const [fieldDescription, setFieldDescription] = useState('');
	const [fieldNumberOfPages, setFieldNumberOfPages] = useState('');
	const [fieldLanguage, setFieldLanguage] = useState('');
	const [fieldImageUrl, setFieldImageUrl] = useState('');
	const [fieldBuyUrl, setFieldBuyUrl] = useState('');

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
		setFieldDescription(book.description);
		setFieldNumberOfPages(book.numberOfPages);
    setFieldLanguage(book.language);
    setFieldImageUrl(book.imageUrl);
    setFieldBuyUrl(book.buyUrl);
		setBooks([...books]);
	};

	const handleButtonClear = async (e, book) => {
		book.editPanelShowing = false;
		setFieldTitle('');
		setFieldDescription('');
		setFieldNumberOfPages('');
		setFieldLanguage('');
		setFieldImageUrl('');
		setFieldBuyUrl('');
		setBooks([...books]);
	};

	const handleButtonSave = async (e, book) => {
		book.editPanelShowing = false;

		book.title = fieldTitle;
		book.description = fieldDescription;
		book.numberOfPages = fieldNumberOfPages;
		book.language = fieldLanguage;
		book.imageUrl = fieldImageUrl;
		book.buyUrl = fieldBuyUrl;

		const putUrl = `${url}/book/${book._id}`;
    await axios.put(putUrl, { 
      title: book.title,
      description: book.description,
      numberOfPages: book.numberOfPages,
      language: book.language,
      imageUrl: book.imageUrl,
      buyUrl: book.buyUrl
    });

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
                        <div className="label">Title:</div>
												<input
													value={fieldTitle}
													onChange={(e) =>
														setFieldTitle(
															e.target.value
														)
													}
												/>
											</div>

											<div className="row">
                        <div className="label">Description:</div>
                        <textarea

													value={fieldDescription}
													onChange={(e) =>
														setFieldDescription(
															e.target.value
														)
													}>
                        </textarea>
											</div>

											<div className="row">
                        <div className="label">Number of Pages:</div>
												<input
													value={fieldNumberOfPages}
													onChange={(e) =>
														setFieldNumberOfPages(
															e.target.value
														)
													}
												/>
											</div>

											<div className="row">
                        <div className="label">Language</div>
												<input
													value={fieldLanguage}
													onChange={(e) =>
														setFieldLanguage(
															e.target.value
														)
													}
												/>
											</div>

											<div className="row">
                        <div className="label">Image URL</div>
												<input
													value={fieldImageUrl}
													onChange={(e) =>
														setFieldImageUrl(
															e.target.value
														)
													}
												/>
											</div>

											<div className="row">
                        <div className="label">Buy URL</div>
												<input
													value={fieldBuyUrl}
													onChange={(e) =>
														setFieldBuyUrl(
															e.target.value
														)
													}
												/>
											</div>

											<div className="innerButtons">
												<button
													onClick={(e) =>
														handleButtonClear(
															e,
															book
														)
													}
												>
													Clear
												</button>
												<button
													onClick={(e) =>
														handleButtonSave(
															e,
															book
														)
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