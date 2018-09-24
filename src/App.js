import React, { Component } from "react";
import styled from "react-emotion";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Nav } from "./Components";
import { Home, Rules, Recipes, Examples, Todo } from "./Routes";

class App extends Component {
	render() {
		return (
			<Wrapper>
				<Router>
					<div>
						<Nav />
						<Route exact path="/" component={Home} />
						<Route path="/rules" component={Rules} />
						<Route exact path="/examples" component={Examples} />
						<Route path="/examples/recipes" component={Recipes} />
						<Route path="/examples/todo" component={Todo} />
					</div>
				</Router>
			</Wrapper>
		);
	}
}

export default App;

const Wrapper = styled("div")``;
