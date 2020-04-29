import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({ item, field, label}) => {
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export {
	Record
};

export default class ItemDetails extends Component {

	state = {
		item: null,
		image: null,
		loading: true,
		error: false
	};

	swapiService = new SwapiService();

	componentDidMount() {
		this.updateItem();
	};

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.setState({ loading: true	});
			this.updateItem();
		}
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false
		});
	};

	updateItem = () => {
		const { itemId, getData, getImageUrl } = this.props;

		getData(itemId)
			.then((item) => {
				this.setState({ 
					item: item,
					image: getImageUrl(itemId),
					loading: false 
				});
			})
			.catch(this.onError);
	};

  render() {
		const { item, image, loading, error } = this.state;
		
		const hasData = !(loading || error);

		const errorMessage = error ? <ErrorIndicator /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = hasData ? <ItemView item={item} image={image}>{this.props.children}</ItemView> : null;

    return (
      <div className="person-details card">
        {errorMessage}
				{spinner}
				{content}
      </div>
    )
  };
};

const ItemView = ({ item, image }) => {

	const { name, gender, birthYear, eyeColor } = item;
	
	return (
		<React.Fragment>
			<img className="person-image"
					src={image}
					alt="character" />
			<div className="card-body">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{ this.props.children }
				</ul>
			</div>
		</React.Fragment>
	)
};

