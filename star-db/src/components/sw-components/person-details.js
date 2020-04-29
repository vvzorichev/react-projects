import React from 'react';

import ItemDetails, { Record } from '../item-details/item-details';
import { withSwapiService } from '../hoc-helpers';

const PersonDetails = (props) => {
	return (
		<ItemDetails {...props}>
				<Record label="Gender" field="gender" />
				<Record label="Eye color" field="eyeColor" />
		</ItemDetails>
	);
};

const mapMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getPerson,
		getImageUrl: swapiService.getPersonImage
	}
}

export default withSwapiService(PersonDetails, mapMethodsToProps);