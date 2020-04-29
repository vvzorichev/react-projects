import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundary from '../error-boudary';

import './people-page.css';

export default class PeoplePage extends Component {

	swapiService = new SwapiService;

	state = {
		selectedPeople: 1
	}

	onPeopleSelected = (id) => {
		this.setState({ selectedPeople: id })
	};

	render() {

		const itemList = (
			<ItemList 
				onItemSelected={this.onPeopleSelected}
				getData={this.swapiService.getAllPeople} >

				{(item) => (
					`${item.name} (${item.birthYear})`
				)}

			</ItemList>
		);

		const personDetails = (
			<ItemDetails 
				itemId={this.state.selectedPeople}
				getData={this.swapiService.getPeople} />
		);

		return (
			<ErrorBoundary>
				<Row left={itemList} right={personDetails} />
			</ErrorBoundary>
		);
	}
}