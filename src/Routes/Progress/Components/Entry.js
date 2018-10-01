import React from "react";
import styled, { css } from "react-emotion";
import EntryComment from "./EntryComment";
import ProgressBar from "./ProgressBar";

export default class Component extends React.Component {
  static defaultProps = {
    date: new Date().toISOString(),
    value: 50,
    deltaValue: 70,
    comment: "Comment..."
  };

  componentWillMount() {}

  render() {
    let { date, value, deltaValue, comment } = this.props;

    let d = new Date(date);

    return (
      <EntryContainer>
        <EntryDate>
          {d.toLocaleDateString("en-gb", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
          <br />
          {d.toLocaleTimeString("en-gb", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })}
        </EntryDate>
        <div
          className={css`
            height: 2em;
          `}
        >
          <ProgressBar value={value} deltaValue={deltaValue} />
        </div>
        {comment && <EntryComment>{comment}</EntryComment>}
      </EntryContainer>
    );
  }
}

const EntryContainer = styled("div")`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1em;
  margin-bottom: 2em;
`;

const EntryDate = styled("div")`
  grid-column: 1;
  text-align: right;
`;
