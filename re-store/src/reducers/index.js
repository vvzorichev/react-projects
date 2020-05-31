const initialState = {
	books: [
		{
			id: 1,
			title: 'Book-1' },
		{ 
			id: 2,
			title: 'Book-2' }
	]
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'BOOKS_LOADED':
			return {
				books: action.payload
			};
		
		default:
			return state;
	}
};

export default reducer;