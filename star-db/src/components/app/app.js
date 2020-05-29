import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boudary';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import { StarshipDetails } from '../sw-components';

import {
	PersonsPage,
	PlanetsPage,
	StarshipsPage,
	LoginPage,
	SecretPage
} from '../pages'

import './app.css';

export default class App extends Component {

	state = {
		isLoggedIn: false
	}

	onLogin = () => {
		this.setState({
			isLoggedIn: true
		});
	};

	swapiService = new DummySwapiService();
	
	render() {

		const { isLoggedIn } = this.state;

		return (
			<ErrorBoundary>
				<Router>
					<SwapiServiceProvider value={this.swapiService} >
						<Header />
						<RandomPlanet />
						<Switch>
							<Route 
								path="/" 
								render={() => <h2>Welcome</h2>}
								exact />
							<Route path="/persons/:id?" component={PersonsPage} />
							<Route path="/planets/" component={PlanetsPage} />
							<Route path="/starships/" exact component={StarshipsPage} />
							<Route 
								path="/starships/:id"
								render={({ match }) => {
									const { id } = match.params;
									return <StarshipDetails itemId={id} />
								}} />
							<Route
								path="/login"
								render={() => {
									return (
										<LoginPage 
											isLoggedIn={isLoggedIn}
											onLogin={this.onLogin} />
									)
								}} />
							<Route
								path="/secret"
								render={() => {
									return (
										<SecretPage isLoggedIn={isLoggedIn} />
									)
								}} />
								<Redirect to="/" />
						</Switch>				
					</SwapiServiceProvider>	
				</Router>
				
			</ErrorBoundary>
  	);
	}
};