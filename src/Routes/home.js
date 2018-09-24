import React from "react";
import { css } from "react-emotion";

export default props => (
	<div
		className={css`
			max-width: 475px;
		`}
	>
		<h1>Home</h1>
		<h2>Introduction</h2>
		<p>
			Welcome to Unstyled, a design challenge for the web. By placing
			restrictions on styling options, Unstyled encourages designers to focus on
			content, usability and accessibility.
		</p>
		<p>An Unstyled website follows a few basic rules:</p>
		<ul>
			<li>No fonts</li>
			<li>No colors</li>
			<li>Images cannot load automatically</li>
		</ul>
		<p>
			For more on creating an Unstyled design, check the{" "}
			<a href="/rules" alt="Rules">
				rules
			</a>{" "}
			section.
		</p>
		<h2>About</h2>
		<p>
			Unstyled was created by{" "}
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="http://twitter.com/steveruizok"
			>
				@steveruizok
			</a>{" "}
			in September 2018.
		</p>
	</div>
);
