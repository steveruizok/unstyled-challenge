import React from "react";
import styled from "react-emotion";
import RecipeWodge from "./Components/recipe_wodge";

const parseQueryString = location => {
	if (!location.search) {
		return;
	}

	var search = location.search.substring(1);
	return JSON.parse(
		'{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
		function(key, value) {
			return key === "" ? value : decodeURIComponent(value);
		}
	);
};

export default class Example extends React.Component {
	queryInput = React.createRef();
	ingredientsInput = React.createRef();

	state = {
		searching: false,
		allResults: [],
		results: [],
		page: 1
	};

	changePage = difference => {};

	searchForRecipes = () => {
		const params = parseQueryString(this.props.location);

		if (!params) {
			return;
		}

		console.log(params);

		this.setState(
			{
				searching: true
			},
			() => {
				this.getRecipes(
					this.ingredientsInput.current.value.split(","),
					this.queryInput.current.value,
					this.state.page
				);
			}
		);
	};

	getRecipes = (ingredients, query, page) => {
		let URI =
			"https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?";

		const params = [];

		if (ingredients) {
			params.push("i=" + ingredients);
		}

		if (query) {
			params.push("q=" + query);
		}

		if (page) {
			params.push("p=" + page);
		}

		URI += params.join("&");

		fetch(URI)
			.then(r => {
				if (!r.ok) {
					throw Error(r.statusText);
				}
				return r.json();
			})
			.then(this.setRecipes)
			.catch(e => {
				console.log("Uh oh, " + e.statusText);
			});
	};

	setRecipes = json => {
		console.log(json);
		this.setState({
			searching: false,
			results: json.results
		});
	};

	componentWillMount() {
		let params = new URL(document.location).searchParams;

		const ingredients = params.get("i");
		const query = params.get("q");
		const page = params.get("p");

		if (ingredients || query || page) {
			console.log(ingredients, query, page);
			this.getRecipes(ingredients, query, page);
		}
	}

	componentWillUpdate() {}

	render() {
		return (
			<div>
				<h1>Recipe Finder</h1>
				<InputForm>
					<InputLabel>Search:</InputLabel>
					<InputField>
						<input
							name="queryInput"
							type="text"
							ref={this.queryInput}
							placeholder="Club sandwich..."
							style={{ width: "100%", maxWidth: "30em" }}
						/>
					</InputField>
					<InputLabel>Ingredients:</InputLabel>
					<InputField>
						<input
							name="ingredientsInpuit"
							type="text"
							ref={this.ingredientsInput}
							placeholder="Flour, eggs..."
							style={{ width: "100%", maxWidth: "30em" }}
						/>
					</InputField>
					<button
						onClick={() => {
							this.setState(
								{
									page: 1
								},
								this.searchForRecipes
							);
						}}
						disabled={this.state.searching}
					>
						{this.state.searching ? "Searching..." : "Search"}
					</button>
				</InputForm>
				<hr />

				<div hidden={this.state.results.length <= 0}>
					<label>{this.state.results.length} Results:</label>
					<div
						style={{
							opacity: this.state.searching ? 0.5 : 1
						}}
					>
						{this.state.results.map(r => (
							<RecipeWodge key={r.title} {...r} />
						))}
					</div>
					<hr />
					<PaginationContainer>
						<button onClick={() => this.changePage(1)}>Prev Page</button>
						<p>Page {this.state.page}</p>
						<button onClick={() => this.changePage(1)}>Next Page</button>
					</PaginationContainer>
				</div>
			</div>
		);
	}
}

const InputForm = styled("div")`
	margin-bottom: 1em;
`;

const InputLabel = styled("label")`
	margin-bottom: 1em;
`;

const InputField = styled("div")`
	margin: 0.5em 0 1em 0;
`;

const PaginationContainer = styled("div")`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;
