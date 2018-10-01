import React from "react";
import ProgressBar from "./Components/ProgressBar";
import Entry from "./Components/Entry";
import { css } from "react-emotion";

export default class Component extends React.Component {
  rangeSlider = React.createRef();
  comment = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      history: history, // see fake history below
      current: value,
      deltaValue: value
    };
  }

  componentDidMount() {
    this.rangeSlider.current.value = this.state.current;
  }

  componentDidUpdate() {
    this.rangeSlider.current.value = this.state.deltaValue;
  }

  handleSliderChange = () => {
    this.setState({
      deltaValue: Math.floor(this.rangeSlider.current.value),
      isReady: this.testForReadiness()
    });
  };

  handleInputChange = () => {
    this.setState({
      isReady: this.testForReadiness()
    });
  };

  addCurrentToHistory = () => {
    let value, deltaValue, comment, newEntry;

    value = this.state.current;
    deltaValue = this.state.deltaValue;
    comment = this.comment.current.value;

    this.comment.current.value = "";

    newEntry = (
      <Entry
        key={"entry_" + (this.state.history.length + 1)}
        date={new Date().toISOString()}
        comment={comment}
        value={value}
        deltaValue={deltaValue}
      />
    );

    this.setState({
      isReady: false,
      current: deltaValue,
      deltaValue: deltaValue,
      history: [newEntry, ...this.state.history]
    });
  };

  testForReadiness = () => {
    let value, deltaValue, comment;

    value = this.state.current;
    deltaValue = this.state.deltaValue;
    comment = this.comment.current.value;

    return comment !== "" || value !== deltaValue;
  };

  render() {
    return (
      <div>
        <h1>Progress Record</h1>
        <h3>Current</h3>
        <div className={currentBarContainer}>
          <ProgressBar
            deltaValue={this.state.deltaValue}
            value={this.state.current}
          />
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
          `}
        />
        <div className={inputsContainer}>
          <input
            ref={this.comment}
            type="text"
            className={commentInput}
            onChange={this.handleInputChange}
            placeholder="Enter a comment..."
          />
          <button
            className={buttonInput}
            onClick={this.addCurrentToHistory}
            disabled={!this.state.isReady}
          >
            Add to History
          </button>
        </div>
        <hr />
        <h3>History</h3>
        {this.state.history}
      </div>
    );
  }
}

const currentBarContainer = css`
  height: 3em;
  margin-bottom: 2em;
`;

const inputsContainer = css`
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1em;
`;

const commentInput = css`
  grid-column: 1;
  width: 100%;
`;

const buttonInput = css`
  grid-column: 2;
  width: fit-content;
`;

// Fake history

const days = n => new Date().getTime() + n * 1000 * 60 * 60 * 24;

const longText =
  "This is a very long comment, intended to break over multiple lines in order to demonstrate the 'show more' and 'show less' features of the EntryComent class. This is a very long comment, intended to break over multiple lines in order to demonstrate the 'show more' and 'show less' features of the EntryComent class.";
const shortText = "A short comment.";

let value = 0;

let history = [1, 2, 3, 4, 5, 6, 7]
  .map(i => {
    let lastValue = value;
    value = Math.floor(lastValue + Math.random() * 55 - 20);

    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    return (
      <Entry
        date={days(-7 + i)}
        key={"entry_" + i}
        comment={
          Math.random() > 0.5
            ? Math.random() > 0.5
              ? longText
              : shortText
            : null
        }
        value={lastValue}
        deltaValue={value}
      />
    );
  })
  .reverse();
