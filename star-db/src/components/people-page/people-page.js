import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';


export default class PeoplePage extends Component {

	state = {
		selectedPeople: 1,
		hasError: true 
	}

	componentDidCatch() {
		this.setState({ hasError: true });
	};

	onPeopleSelected = (id) => {
		this.setState({ selectedPeople: id })
	};

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		return (
			<div className="row mb2 page">
				<div className="col-md-6">
					<ItemList onItemSelected={this.onPeopleSelected}/>
				</div>
				<div className="col-md-6 details">
					<PersonDetails peopleId={this.state.selectedPeople}/>
				</div>
			</div>
		);
	}
}