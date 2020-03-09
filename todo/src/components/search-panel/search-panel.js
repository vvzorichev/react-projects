import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

	state = {
		term: ''
	};

	onTermChange = (event) => {
		const {onSearchChange = () => {}} = this.props;
    this.setState({
      term: event.target.value
    });

    onSearchChange(event.target.value);
	}

	render() {
		return (
    	<input type="text"
           	 className="form-control search-input"
             placeholder="type to search" 
						 value={this.state.term}
						 onChange={this.onTermChange} />
  	);
	}
}
