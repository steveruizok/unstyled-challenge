import React from "react";
import { css } from "react-emotion";
import { Link } from "react-router-dom";

export default props => (
	<div
		className={css`
			max-width: 475px;
		`}
	>
		<h1>Examples</h1>
		<ul>
			<li>
				<Link to="/examples/todo">Todo List</Link>
			</li>
			<li>
				<Link to="/examples/recipes">Recipe Finder</Link>
			</li>
		</ul>
	</div>
);
