const updateCartItem = (book, item = {}, quantity) => {
	const {
		id = book.id,
		title = book.title,
		count = 0,
		total = 0
	} = item;

	return {
		id,
		title,
		count: count + quantity,
		total: total + quantity*book.price
	}
};

const updateCartItems = (cartItems, item, index) => {
	if (item.count === 0) {
		return [
			...cartItems.slice(0, index),
			...cartItems.slice(index + 1)
		]
	}
	if (index === -1) {
		return [
			...cartItems,
			item
		];
	} 
	else {
		return [
			...cartItems.slice(0, index),
			item,
			...cartItems.slice(index + 1)
		];
	}
};

const updateCart = (state, bookId, quantity) => {
	
	const { bookList: { books }, shoppingCart: { cartItems } } = state;
	
	const book = books.find(({ id }) => id === bookId);
	const bookIndex = cartItems.findIndex(({ id }) => id === bookId);
	const item = cartItems[bookIndex];

	const newItem = updateCartItem(book, item, quantity);

	return {
		orderTotal: 0,
		cartItems: updateCartItems(cartItems, newItem, bookIndex)
	};
};

const updateShoppingCart = (state, action) => {
	const { type, payload } = action;

	if (state === undefined) {
		return {
			cartItems: [],
			orderTotal: 0
		}
	}

	switch (type) {
		
		case 'BOOK_ADDED_TO_CART':
			return updateCart(state, payload, 1);

		case 'BOOK_REMOVED_FROM_CART':
			return updateCart(state, payload, -1);

		case 'ALL_BOOKS_REMOVED_FROM_CART':
			const book = state.shoppingCart.cartItems.find(({ id }) => id === payload);
			return updateCart(state, payload, -book.count);

		default:
			return state.shoppingCart;
	}
};

export default updateShoppingCart;