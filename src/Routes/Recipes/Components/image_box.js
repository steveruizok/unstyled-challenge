import React from "react";
import styled, { css } from "react-emotion";
import mq from "../../../Components/media";

class ImageBox extends React.Component {
	state = {
		open: false,
		image: null
	};

	handleClick = event => {
		const { title, href, src } = this.props;
		event.preventDefault();

		const newOpen = !this.state.open;

		this.setState({
			open: newOpen,
			image: newOpen ? (
				<a href={href}>
					<Image alt={title} src={src} />
				</a>
			) : null
		});
	};

	render() {
		return (
			<ImageBoxContainer>
				<div>{this.state.image}</div>
				{this.state.open ? null : (
					<button onClick={this.handleClick}>Show image</button>
				)}
			</ImageBoxContainer>
		);
	}
}

export default ImageBox;

const ImageBoxContainer = styled("div")`
	margin-bottom: 1em;
`;

const Image = styled("img")`
	${mq.small(css`
		width: 100%;
	`)};
`;
