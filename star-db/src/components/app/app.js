import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boudary';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import {
	PersonsPage,
	PlanetsPage,
	StarshipsPage
} from '../pages'

import './app.css';

export default class App extends Component {
	swapiService = new SwapiService();
	
	render() {
		return (
			<ErrorBoundary>
				<SwapiServiceProvider value={this.swapiService} >
					<Header />
					<RandomPlanet />

					<PersonsPage />
					<PlanetsPage />
					<StarshipsPage />
					
				</SwapiServiceProvider>
			</ErrorBoundary>
  	);
	}
};