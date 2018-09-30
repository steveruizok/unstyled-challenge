import React from "react";
import styled, { css } from "react-emotion";

export default class Component extends React.Component {
  rangeSlider = React.createRef();
  deltaFill = React.createRef();
  canvas = React.createRef();

  static defaultProps = {
    value: 50
  };

  defaultStyles = {
    pct: "",
    pctPrefix: "",
    priorBg: "var(--tone-light)",
    deltaBg: "var(--tone-lighter)"
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.defaultStyles,
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
    const initial = this.props.value;
    const sliderValue = parseInt(this.rangeSlider.current.value, 10);
    const delta = sliderValue - initial;

    let d = Object.assign({}, this.defaultStyles, {});

    if (delta > 0) {
      Object.assign(d, {
        pctPrefix: "+",
        deltaBg: "var(--tone-lighter)"
      });
    }

    if (sliderValue === 100) {
      Object.assign(d, {
        deltaBg: "var(--tone-light)"
      });
    }

    this.setState({
      ...d,
      pct: parseInt(delta, 10).toFixed(0),
      deltaValue: sliderValue,
      delta: Math.abs(delta)
    });
  };

  render() {
    let { delta, deltaValue, pct, pctPrefix, priorBg, deltaBg } = this.state;
    let { showPct, value } = this.props;

    return (
      <ProgressContainer>
        {showPct && (
          <PercentageContainer>
            {deltaValue !== value && (
              <Percentage
                className={css`
                  left: ${deltaValue}%;
                `}
              >
                {pctPrefix}
                {pct}
              </Percentage>
            )}
          </PercentageContainer>
        )}
        <ProgressRail className={css``}>
          <PriorValueContainer
            className={css`
              width: ${value}%;
              background: ${priorBg};
            `}
          />
          <DeltaFill
            ref={this.deltaFill}
            className={css`
              left: ${deltaValue > value ? value : deltaValue}%;
              width: ${delta}%;
              background: ${deltaBg};
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
        <button
          className={css`
            margin-top: 2em;
            width: 100%;
          `}
        >
          Submit
        </button>
        <hr />
      </ProgressContainer>
    );
  }
}

const ProgressContainer = styled("div")`
  height: 100%;
  margin-bottom: 1em;
`;

const PriorValueContainer = styled("div")`
  height: 48px;
`;

const ProgressRail = styled("div")`
  position: relative;
  border: 1px solid;
  height: 3wm;
  margin: 0 5px 0 8px;
  border-radius: 3px;
  overflow: hidden;
`;

const DeltaFill = styled("div")`
  position: absolute;
  top: 0;
  height: 3em;
  border-right: var(--border);
  border-left: var(--border);
`;

const PercentageContainer = styled("div")`
  position: relative;
  height: 1em;
  margin: 0 5px 1em 8px;
`;

const Percentage = styled("div")`
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 0;
  width: 0;
`;
