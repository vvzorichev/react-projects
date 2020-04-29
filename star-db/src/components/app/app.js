import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page/people-page';
import ErrorBoundary from '../error-boudary';
import ItemDetails, { Record } from '../item-details/item-details';
import Row from '../row';
import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {
	swapiService = new SwapiService;
	
	render() {
		
		const { getPerson, 
						getStarship, 
						getPersonImage,
						getStarshipImage } = this.swapiService;

		const personDetails = (
			<ItemDetails 
				itemId={11}
				getData={getPerson}
				getImageUrl={getPersonImage}>
					<Record label="Gender" field="gender" />
			</ItemDetails>
		);

		const starshipDetails = (
			<ItemDetails 
				itemId={9}
				getData={getStarship}
				getImageUrl={getStarshipImage}>
			
			</ItemDetails>
		);

		return (
			<ErrorBoundary>
				<div>
					<Header />
					<Row 
						left={personDetails}
						right={starshipDetails} />
				</div>
			</ErrorBoundary>
			
  	);
	}
};