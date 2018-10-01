import React from "react";
import ProgressField from "./Components/ProgressField";
import Entry from "./Components/Entry";

const days = n => new Date().getTime() + n * 1000 * 60 * 60 * 24;

const longText =
  "This is a very long comment, intended to break over multiple lines in order to demonstrate the 'show more' and 'show less' features of the EntryComent class. This is a very long comment, intended to break over multiple lines in order to demonstrate the 'show more' and 'show less' features of the EntryComent class.";
const shortText = "A short comment.";

let value = 0;

let history = [1, 2, 3, 4, 5, 6, 7]
  .map(i => {
    let lastValue = value;
    value = lastValue + Math.random() * 55 - 20;

    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    return (
      <Entry
        date={days(-7 + i)}
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

export default class Component extends React.Component {
  state = {
    history: history,
    current: value
  };

  componentWillMount() {}

  addCurrentToHistory = (value, deltaValue, comment) => {
    let newEntry = (
      <Entry
        date={new Date().toISOString()}
        comment={comment}
        value={value}
        deltaValue={deltaValue}
      />
    );
    this.setState({
      current: deltaValue,
      history: [newEntry, ...this.state.history]
    });
  };

  render() {
    return (
      <div>
        <h1>Progress Record</h1>
        <h3>Current</h3>
        <ProgressField
          value={this.state.current}
          handleClick={this.addCurrentToHistory}
        />
        <h3>History</h3>
        {this.state.history}
      </div>
    );
  }
}
