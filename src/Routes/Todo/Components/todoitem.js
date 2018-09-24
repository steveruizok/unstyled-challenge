import React from "react";
import styled from "react-emotion";

export default ({ title, completed, date }) => {
	return (
		<ListItem>
			<span>{completed ? <s>{title}</s> : title}</span>
			<br />
			<small>
				{date.toLocaleString("en-gb", {
					hour12: true,
					hour: "numeric",
					minute: "2-digit"
				})}
			</small>
		</ListItem>
	);
};

const ListItem = styled("div")`
	width: 100%;
`;
