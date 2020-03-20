import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

	state = {
		people: null,
		loading: true,
		error: false
	};

	swapiService = new SwapiService();

	componentDidMount() {
		this.updatePeople();
	};

	componentDidUpdate(prevProps) {
		if (this.props.peopleId !== prevProps.peopleId) {
			this.setState({ loading: true	});
			this.updatePeople();
		}
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false
		});
	};

	updatePeople = () => {
		const { peopleId } = this.props;
		this.swapiService.getPeople(peopleId)
			.then((people) => {
				this.setState({ 
					people: people,
					loading: false 
				});
			})
			.catch(this.onError);
	};

  render() {
		const { people, loading, error } = this.state;
		
		const hasData = !(loading || error);

		const errorMessage = error ? <ErrorIndicator /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = hasData ? <PeopleView people={people} /> : null;

    return (
      <div className="person-details card">
        {errorMessage}
				{spinner}
				{content}
      </div>
    )
  };
};

const PeopleView = ({people}) => {

	const { id, name, gender, birthYear, eyeColor } = people;
	
	return (
		<React.Fragment>
			<img className="person-image"
					src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
					alt="character" />
			<div className="card-body">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Gender</span>
						<span>{gender}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Birth Year</span>
						<span>{birthYear}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Eye Color</span>
						<span>{eyeColor}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	)
};

