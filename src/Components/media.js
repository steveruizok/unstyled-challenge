import { css } from "emotion";

const breakpoints = {
	// Numerical values will result in a min-width query
	small: 475
};

const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
	let prefix = typeof breakpoints[label] === "string" ? "" : "max-width:";
	let suffix = typeof breakpoints[label] === "string" ? "" : "px";
	accumulator[label] = cls =>
		css`
			@media (${prefix + breakpoints[label] + suffix}) {
				${cls};
			}
		`;
	return accumulator;
}, {});

export default mq;
