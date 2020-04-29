import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boudary';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import {
	PersonList,
  PlanetList,
	StarshipList,
	PersonDetails,
  PlanetDetails,
	StarshipDetails
} from '../sw-components'

import './app.css';

export default class App extends Component {
	swapiService = new SwapiService();
	
	render() {
		return (
			<ErrorBoundary>
				<SwapiServiceProvider value={this.swapiService} >
					<Header />
					<RandomPlanet />
					<PersonDetails itemId={11} />
					<PersonList />
					<PlanetDetails itemId={5} />
					<PlanetList />
					<StarshipDetails itemId={10} />
					<StarshipList />
				</SwapiServiceProvider>
			</ErrorBoundary>
  	);
	}
};