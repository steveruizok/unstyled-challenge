import React from "react";
import styled, { css } from "react-emotion";
import ProgressBar from "./ProgressBar";

export default class Component extends React.Component {
  rangeSlider = React.createRef();
  comment = React.createRef();

  static defaultProps = {
    value: 50
  };

  constructor(props) {
    super(props);

    this.state = {
      deltaValue: props.value
    };
  }

  componentDidMount() {
    this.rangeSlider.current.value = this.props.value;
  }

  componentDidUpdate() {
    this.rangeSlider.current.value = this.state.deltaValue;
  }

  handleSliderChange = () => {
    this.setState({
      deltaValue: parseInt(this.rangeSlider.current.value, 10)
    });
  };

  render() {
    let { deltaValue } = this.state;
    let { value } = this.props;

    return (
      <ProgressContainer>
        <div
          className={css`
            height: 3em;
          `}
        >
          <ProgressBar value={value} deltaValue={deltaValue} />
        </div>
        <input
          ref={this.rangeSlider}
          type="range"
          min={0}
          max={100}
          step="any"
          onChange={this.handleSliderChange}
          className={css`
            width: 100%;
            margin-top: 1em;
          `}
        />
        <div
          className={css`
            margin-top: 2em;
            display: grid;
            grid-template-columns: 1fr auto;
            grid-column-gap: 1em;
          `}
        >
          <input
            ref={this.comment}
            type="text"
            className={css`
              grid-column: 1;
              width: 100%;
            `}
            placeholder="Enter a comment..."
          />
          <button
            className={css`
              grid-column: 2;
              width: fit-content;
            `}
            onClick={() => {
              this.props.handleClick(
                value,
                deltaValue,
                this.comment.current.value
              );
            }}
          >
            Add to History
          </button>
        </div>
        <hr />
      </ProgressContainer>
    );
  }
}

const ProgressContainer = styled("div")`
  height: 100%;
  margin-bottom: 1em;
`;
