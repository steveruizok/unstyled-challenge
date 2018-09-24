import React from "react";
import styled, { css } from "react-emotion";
import { TodoItem } from "./Components";

const days = n => new Date().getTime() + n * 1000 * 60 * 60 * 24;

class TodoList extends React.Component {
	inputField = React.createRef();

	state = {
		canSubmit: false,
		todos: [
			{
				date: new Date(days(-0.15)),
				title: "Take out the trash",
				completed: false
			},
			{
				date: new Date(days(-1.5)),
				title: "Feed the dogs",
				completed: false
			},
			{
				date: new Date(days(-1.76)),
				title: "Study the blade",
				completed: true
			}
		]
	};

	toggleTodoCompleted = todo => {
		const todos = this.state.todos.slice();
		const todoInArray = todos[todos.indexOf(todo)];
		todoInArray.completed = !todoInArray.completed;
		this.setState({
			todos: todos
		});
	};

	updateSubmit = () => {
		this.setState({
			canSubmit: this.inputField.current.value.length > 0
		});
	};

	createTodo = () => {
		if (this.inputField.current.value.length <= 0) {
			return;
		}

		const todo = {
			title: this.inputField.current.value,
			completed: false
		};

		this.setState({
			todos: [...this.state.todos, todo],
			canSubmit: false
		});

		this.inputField.current.value = "";
	};

	clearTodos = () => {
		const completedTodos = this.state.todos.filter(t => !t.completed);

		this.setState({
			todos: completedTodos
		});
	};

	processTodos = () => {
		const dates = {};

		this.state.todos.forEach(t => {
			const date = t.date.toISOString().split("T")[0];

			if (!dates[date]) {
				dates[date] = [];
			}

			dates[date].push(t);
		});

		return Object.keys(dates).map((d, i) => {
			return (
				<div key={`${d}_title_${i}`}>
					<h3>
						{new Date(d).toLocaleDateString("en-gb", {
							weekday: "long"
						})}{" "}
						–{" "}
						<small>
							{new Date(d).toLocaleDateString("en-gb", {
								month: "long",
								day: "numeric",
								year: "numeric"
							})}
						</small>
					</h3>
					<ul>
						{dates[d].map((t, j) => (
							<ListItem
								key={`${t.title}_title_${i}_${j}`}
								onClick={() => {
									this.toggleTodoCompleted(t);
								}}
							>
								<TodoItem key={`${t.title}_label_${i}_${j}`} {...t} />
							</ListItem>
						))}
					</ul>
				</div>
			);
		});
	};

	render() {
		const now = new Date();
		console.log(now.toISOString().slice(0, -2));
		//2017-06-13T13:00
		//2018-09-24T07:52:14.612Z
		return (
			<div>
				<h1>Todo List</h1>
				{this.processTodos()}
				<button
					hidden={this.state.todos.filter(t => t.completed).length <= 0}
					onClick={this.clearTodos}
				>
					Clear Completed
				</button>
				<InputContainer>
					<input
						type="text"
						style={{ gridColumn: "span 2" }}
						ref={this.inputField}
						onSubmit={this.createTodo}
						onChange={this.updateSubmit}
						onKeyUp={({ key }) => {
							if (key !== "Enter") {
								return;
							}
							this.createTodo();
						}}
						placeholder="Add a new todo..."
					/>
					<input
						type="datetime-local"
						onChange={ev => console.log(ev)}
						value={now.toISOString().slice(0, -8)}
					/>
					<button disabled={!this.state.canSubmit} onClick={this.createTodo}>
						➕
					</button>
				</InputContainer>
			</div>
		);
	}
}

export default TodoList;

const ListItem = styled("li")`
	margin: 1em 0em;
`;

const InputContainer = styled("div")`
	margin: 1em 0;
	max-width: 30em;
	display: grid;
	grid-template-columns: auto fit-content;
	grid-template-rows: auto;
	grid-gap: 0.5em;
`;
