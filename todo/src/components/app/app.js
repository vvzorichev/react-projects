import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

	maxId = 1;

	createTodoItem = (label) => {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	};

	state = {
		items: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a lunch')
		],
		filter: 'all',
    search: ''
	};

	onAdd = (text) => {
		const newItem = this.createTodoItem(text);
		this.setState(({items}) => {
			const newArray = [...items,
											  newItem];
			return {
				items: newArray
			} 
		});
	};

	onDelete = (id) => {
		this.setState(({items}) => {
			const idx = items.findIndex((el) => el.id === id);
			const newArray = [...items.slice(0, idx),
											  ...items.slice(idx + 1)];
			return {
				items: newArray
			};
		});
	};

	toggleProperty = (arr, id, propName) => {
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };
		const newArray = [
			...arr.slice(0, idx), 
			newItem, 
			...arr.slice(idx + 1)];
		return newArray;
	};

	onDone = (id) => {
		this.setState(({items}) => {
			return {
				items: this.toggleProperty(items, id, 'done')
			}
		});
	};

	onImportant = (id) => {
		this.setState(({items}) => {
			return {
				items: this.toggleProperty(items, id, 'important')
			}
		});
	};

	onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onSearchChange = (search) => {
    this.setState({ search });
  };

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  };

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  };

	render() {
		const { items, filter, search } = this.state;

    const doneCount = items.filter((item) => item.done).length;
		const todoCount = items.length - doneCount;
		
		const visibleItems = this.searchItems(this.filterItems(items, filter), search);

		return (
			<div className="todo-app">
				<AppHeader 
					toDo={todoCount} 
					done={doneCount} />
	
				<div className="top-panel d-flex">
					<SearchPanel 
						onSearchChange={this.onSearchChange} />

					<ItemStatusFilter 
						filter={filter}
            onFilterChange={this.onFilterChange} />
				</div>
	
				<TodoList 
					todos={visibleItems}
					onDelete={this.onDelete}
					onImportant={this.onImportant}
					onDone={this.onDone} />

				<ItemAddForm 
					onAdd={this.onAdd} />
			</div>
		);
	}
}