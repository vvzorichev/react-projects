import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

	maxId = 100;

	createTodoItem = (label) => {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a lunch')
		]
	};

	deleteItem = (id) => {
		this.setState(({todoData}) => {
			const idx = todoData.findIndex((el) => el.id == id);
			const newArray = [...todoData.slice(0, idx),
											  ...todoData.slice(idx + 1)];
			return {
				todoData: newArray
			}
		});
	};

	addItem = (text) => {
		const newItem = this.createTodoItem(text);

		this.setState(({todoData}) => {
			const newArray = [...todoData,
											  newItem];
			return {
				todoData: newArray
			} 
		});
	};

	toggleProperty = (arr, id, propName) => {
		const idx = arr.findIndex((el) => el.id == id);
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };
		const newArray = [
			...arr.slice(0, idx), 
			newItem, 
			...arr.slice(idx + 1)];
		return newArray;
	}

	onToggleDone = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	};

	onToggleImportant = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		});
	};

	render() {

		const doneCount = this.state.todoData.filter((el) => el.done).length;
		const todoCount = this.state.todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader 
					toDo={doneCount} 
					done={todoCount} />
	
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>
	
				<TodoList 
					todos={this.state.todoData}
					onDeleted={this.deleteItem}
					onImportant={this.onToggleImportant}
					onDone={this.onToggleDone} />

				<ItemAddForm 
					onItemAdded={this.addItem}/>
				
			</div>
		);
	}
}