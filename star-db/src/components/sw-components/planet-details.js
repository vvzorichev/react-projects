import React from 'react';

import ItemDetails, { Record } from '../item-details/item-details';
import { withSwapiService } from '../hoc-helpers';

const PlanetDetails = (props) => {
	return (
		<ItemDetails {...props}>
				<Record label="Populaton" field="population" />
				<Record label="Rotation period" field="RotationPeriod" />
		</ItemDetails>
	);
};

const mapMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getPlanet,
		getImageUrl: swapiService.getPlanetImage
	};
};

export default withSwapiService(PlanetDetails, mapMethodsToProps);