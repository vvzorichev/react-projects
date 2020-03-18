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
		return res.results;
	}

	async getPerson(id) {
		const person = await this.getResource(`/persons/${id}/`);
		return this._transformPerson(person);	
	}

	async getAllPersons() {
		const res = await this.getResource(`/persons/`);
		return res.results;
	}

	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`);
		return this._transformPlanet(planet);	
	}

	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results;
	}

	async getStarship(id) {
		const starship = await this.getResource(`/starships/${id}/`);
		return this._transformStarship(starship);	
	}

	_extractID(item) {
		const idRegExp = /\/([0-p]*)\/$/;
		return item.url.match(idRegExp)[1];
	}

	_transformPerson(person) {
		return { 
			id: this._extractID(person),
			name: person.name,
			gender: person.gender, 
			birthYear: person.birthYear,
			eyeColor: person.eyeColor
		}
	}

	_transformPlanet(planet) {
		return { 
			id: this._extractID(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter
		}
	}

	_transformStarship(starship) {
		return { 
			id: this._extractID(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.costInCredits,
			length:starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			cargoCapacity: starship.cargoCapacity
		}
	}

};