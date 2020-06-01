const updateBookList = (state, action) => {

	if (state === undefined) {
		return {
			books: [],
			loading: true,
			error: null
		};
	}

	const { type, payload } = action;

	switch (type) {

		case 'FETCH_BOOKS_REQUEST':
			return {
				books: [],
				loading: true,
				error: null
			};

		case 'FETCH_BOOKS_SUCCESS':
			return {
				books: payload,
				loading: false,
				error: null
			};
		
		case 'FETCH_BOOKS_FAILURE':
			return {
				books: [],
				loading: false,
				error: payload
			};

		default:
			return state.bookList;
	}
};

export default updateBookList;