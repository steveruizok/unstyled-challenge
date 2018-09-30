import React from "react";
import styled from "react-emotion";
import RecipeWodge from "./Components/recipe_wodge";

export default class Component extends React.Component {
  queryInput = React.createRef();
  ingredientsInput = React.createRef();

  page = 1; // The current page

  state = {
    hasQuery: false,
    searching: false,
    results: []
  };

  componentWillMount() {
    this.fetchRecipesFromUrl();
  }

  fetchRecipesFromUrl = () => {
    let params = new URL(document.location).searchParams;

    const ingredients = params.get("i");
    const query = params.get("q");
    const page = params.get("p");

    this.page = page ? parseInt(page, 10) : 1;

    this.getRecipes(ingredients, query, page);
  };

  handleSearchClick = () => {
    this.page = 1;
    this.setUrl();
  };

  handlePageChange = difference => {
    this.page += difference;
    this.setUrl();
  };

  setUrl = () => {
    let queryString =
      (this.ingredientsInput.current.value
        ? `i=${this.ingredientsInput.current.value.split(",").join(",")}&`
        : ``) +
      (this.queryInput.current.value
        ? `q=${this.queryInput.current.value}&`
        : ``) +
      `p=${this.page}`;

    this.props.history.push("?" + queryString);

    this.setState(
      {
        hasQuery: true,
        results: [],
        searching: true
      },
      this.fetchRecipesFromUrl
    );
  };

  getRecipes = (ingredients = "", query = "") => {
    let url =
      `https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?` +
      (ingredients ? `i=${ingredients}&` : ``) +
      (query ? `q=${query}&` : ``) +
      `&p=${this.page}`;

    fetch(url)
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
    this.setState({
      hasQuery: true,
      searching: false,
      results: json.results
    });
  };

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
            onClick={this.handleSearchClick}
            disabled={this.state.searching}
          >
            {this.state.searching ? "Searching..." : "Search"}
          </button>
        </InputForm>
        <hr />
        <div hidden={this.state.hasQuery}>
          <p>To find recipes, enter a search in the controls above.</p>
        </div>
        <div hidden={!this.state.searching}>
          <p>Searching...</p>
        </div>
        {this.state.hasQuery &&
          this.state.results.length === 0 &&
          !this.state.searching && (
            <div>
              <p>No results.</p>
            </div>
          )}
        <div hidden={this.state.results.length <= 0}>
          <label>{this.state.results.length} Results:</label>
          <div
            style={{
              opacity: this.state.searching ? 0.5 : 1
            }}
          >
            {this.state.results.map((r, i) => (
              <RecipeWodge key={r.title + "_" + i} {...r} />
            ))}
          </div>
          <hr />
          <PaginationContainer>
            <button onClick={() => this.handlePageChange(-1)}>Prev Page</button>
            <p>Page {this.page}</p>
            <button onClick={() => this.handlePageChange(1)}>Next Page</button>
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
