import React from "react";
import styled, { cx, css } from "react-emotion";
import "../../../index.css";

export default class Component extends React.Component {
  rangeSlider = React.createRef();
  deltaFill = React.createRef();
  canvas = React.createRef();

  state = {
    priorValue: 50,
    deltaValue: 50
  };

  componentDidMount() {
    this.rangeSlider.current.value = this.state.priorValue;
  }

  componentDidUpdate() {
    this.rangeSlider.current.value = this.state.deltaValue;
  }

  handleSliderChange = () => {
    this.setState({
      deltaValue: this.rangeSlider.current.value
    });
  };

  render() {
    const { priorValue, deltaValue } = this.state;

    return (
      <ProgressContainer>
        <ProgressRail>
          <div
            className={cx(
              "",
              css`
                background: var(--tone);
                height: 48px;
                width: ${priorValue}%;
              `
            )}
          />
          <DeltaFill
            ref={this.deltaFill}
            className={css`
              position: absolute;
              top: 0;
              left: ${deltaValue > priorValue ? priorValue : deltaValue}%;
              width: ${Math.abs(priorValue - deltaValue)}%;
              border-right: 1px solid #000;
              border-left: 1px solid #000;
              background: ${deltaValue > priorValue
                ? "var(--tone-light)"
                : "var(--tone-lighter)"};
            `}
          />
        </ProgressRail>

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
          list="tickmarks"
        />
      </ProgressContainer>
    );
  }
}

const ProgressContainer = styled("div")`
  height: 100%;
`;

const ProgressRail = styled("div")`
  position: relative;
  border: 1px solid;
  height: 48px;
  margin: 0 5px 0 8px;
  border-radius: 3px;
  overflow: hidden;
`;

const DeltaFill = styled("div")`
  height: 48px;
`;
