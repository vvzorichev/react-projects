export default class SwapiService {

	_apiBase = 'https://swapi.co/api';

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
		}
		
		const body = await res.json();
		return body;
	};

	async getAllPlpanets() {
		const res = await this.getResource(`/planets/`);
		return res.results.map(this._transformPlanet);
	}

	async getPeople(id) {
		const people = await this.getResource(`/people/${id}/`);
		console.log(people);
		return this._transformPeople(people);	
	}

	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results.map(this._transformPeople);
	}

	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`);
		return this._transformPlanet(planet);	
	}

	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results.map(this._transformStarship);;
	}

	async getStarship(id) {
		const starship = await this.getResource(`/starships/${id}/`);
		return this._transformStarship(starship);	
	}

	_extractID(item) {
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