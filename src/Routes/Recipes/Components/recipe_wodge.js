import React from "react";
import styled from "react-emotion";
import ImageBox from "./image_box";

export default props => {
	const { title, href, thumbnail, ingredients } = props;
	const ingrs = ingredients.split(",");

	return (
		<Wodge key={title}>
			<a
				target="_blank"
				rel="noopener noreferrer"
				hrefLang="english"
				href={href}
			>
				<Title>{title}</Title>
			</a>
			{thumbnail && <ImageBox {...props} src={props.thumbnail} />}
			<div>Ingredients:</div>
			<IngredientsList>
				{ingrs.slice(0, 10).map((ingredient, i) => (
					<li key={`${title})_ingredient_${i}`}>{ingredient}</li>
				))}
			</IngredientsList>
			{ingrs.length > 10 && (
				<div style={{ marginLeft: "2em" }}>+ {ingrs.length - 10} more</div>
			)}
		</Wodge>
	);
};

const Wodge = styled("div")`
	margin-bottom: 3em;
`;

const Title = styled("h2")``;

const IngredientsList = styled("ul")``;
