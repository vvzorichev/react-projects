import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';

class BookList extends Component {

	componentDidMount() {
		const { bookstoreService } = this.props;
		const data = bookstoreService.getBooks();



	}

	render() {

		const { books } = this.props;
		return (
			<ul>
				{
					books.map((book) => {
						return (
							<li key={book.id}>
								<BookListItem book={book} />
							</li>
						);
					})
				}
			</ul>
		);
	}
};

const mapStateToProps = ({ books }) => {
	return { books };
};

const mapDispatchToProps = (dispatch) => {
	return {
		booksLoaded: (newBooks) => {
			dispatch({
				type: 'BOOKS_LOADED',
				payload: newBooks
			})
		}
	}
}

export default withBookstoreService()(
	connect(mapStateToProps, mapDispatchToProps)(BookList)
);