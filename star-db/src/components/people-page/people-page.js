import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details//item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundary from '../error-boudary';

import './people-page.css';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPeople: 1
	}

	onPeopleSelected = (id) => {
		this.setState({ selectedPeople: id })
	};

	render() {

		const { getPerson, 
						getPersonImage,
						getAllPerson } = this.swapiService;

		const itemList = (
			<ItemList 
				onItemSelected={this.onPeopleSelected}
				getData={getAllPerson} >


			</ItemList>
		);

		const personDetails = (
			<ItemDetails 
				itemId={this.state.selectedPeople}
				getData={getPerson}
				getImageUrl={getPersonImage}>
					<Record label="Gender" field="gender" />
					<Record label="Eye color" field="eyeColor" />
			</ItemDetails>
		);

		return (
			<ErrorBoundary>
				<Row left={itemList} right={personDetails} />
			</ErrorBoundary>
		);
	}
}