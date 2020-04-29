import React, { Component } from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';

const withChildFunction = (Wrapped, childFunction) => {
	return (props) => {
		return (
			<Wrapped {...props}>
				{childFunction}
			</Wrapped>
		);
	};
};

const renderName = ({ name }) => <span>{name}</span>;

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPersons
	};
};

const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets
	};
};

const mapStasrhipMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships
	};
};

const PersonList = withSwapiService(
											withData(withChildFunction(ItemList, renderName)),
											mapPersonMethodsToProps);
const PlanetList = withSwapiService(
											withData(withChildFunction(ItemList, renderName)),
											mapPlanetMethodsToProps);
const StarshipList = withSwapiService(
											withData(withChildFunction(ItemList, renderName)),
											mapStasrhipMethodsToProps);

export {
	PersonList,
  PlanetList,
	StarshipList
};