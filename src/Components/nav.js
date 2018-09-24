import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "react-emotion";
import mq from "./media";

export default props => [
	<NavWrapper>
		<Title>Unstyled</Title>
		<NavList>
			<NavItem>
				<Link to="/">Home</Link>
			</NavItem>
			<NavItem>
				<Link to="/rules">Rules</Link>
			</NavItem>
			<NavItem>
				<Link to="/examples">Examples</Link>
			</NavItem>
		</NavList>
	</NavWrapper>,
	<hr />
];

const NavWrapper = styled("div")`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Title = styled("h2")`
	margin-right: 1.25em;
`;

const NavList = styled("ul")`
	display: flex;
	list-style-type: none;
	align-items: center;
	margin: 0;
	padding: 0;
	${mq.small(css`
		display: block;
		width: 100%;
		list-style-type: disc;
	`)};
`;

const NavItem = styled("li")`
	margin: 0.75em 1.25em;
`;
