export default class SwapiService {

	_apiBase = 'https://swapi.dev/api';
	_imageBase = 'https://starwars-visualguide.com/assets/img'

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
		}
		
		const body = await res.json();
		return body;
	};

	getAllPlanets = async () => {
		const res = await this.getResource(`/planets/`);
		return res.results.map(this._transformPlanet);
	}

	getPerson = async (id) => {
		const people = await this.getResource(`/people/${id}/`);
		return this._transformPeople(people);	
	}

	getAllPersons = async () => {
		const res = await this.getResource(`/people/`);
		return res.results.map(this._transformPeople);
	}

	getPlanet = async (id) => {
		const planet = await this.getResource(`/planets/${id}/`);
		return this._transformPlanet(planet);	
	}

	getAllStarships = async () =>  {
		const res = await this.getResource(`/starships/`);
		return res.results.map(this._transformStarship);;
	}

	getStarship = async (id) => {
		const starship = await this.getResource(`/starships/${id}/`);
		return this._transformStarship(starship);	
	}

	getPersonImage = (id) => {
		return `${this._imageBase}/characters/${id}.jpg`;
	}

	getPlanetImage = (id) => {
		return `${this._imageBase}/planets/${id}.jpg`;
	}

	getStarshipImage = (id) => {
		return `${this._imageBase}/starships/${id}.jpg`;
	}

	_extractID = (item) => {
		const idRegExp = /\/([0-p]*)\/$/;
		return item.url.match(idRegExp)[1];
	}

	_transformPeople = (people) => {
		return { 
			id: this._extractID(people),
			name: people.name,
			gender: people.gender, 
			birthYear: people.birth_year,
			eyeColor: people.eye_color
		}
	}

	_transformPlanet = (planet) => {
		return { 
			id: this._extractID(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter
		}
	}

	_transformStarship = (starship) => {
		return { 
			id: this._extractID(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.costInCredits,
			length:starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			cargoCapacity: starship.cargo_apacity
		}
	}

};