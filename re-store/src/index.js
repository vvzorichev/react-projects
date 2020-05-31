import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundary from './components/error-boudary';
import { BookstoreServiceProvider } from './components/bookstore-service-context';
import BookstoreService from './services/bookstore-service';

import store from './store';

const bookstoreService = new BookstoreService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
			<ErrorBoundary>
				<BookstoreServiceProvider value={bookstoreService}>
					<Router>
						<App />
					</Router>
				</BookstoreServiceProvider>
			</ErrorBoundary>
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);