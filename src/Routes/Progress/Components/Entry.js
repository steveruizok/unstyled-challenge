import React from "react";
import styled, { css } from "react-emotion";
import EntryComment from "./EntryComment";

export default class Component extends React.Component {
  static defaultProps = {
    date: new Date().toISOString(),
    value: 50,
    comment: "Comment..."
  };

  componentWillMount() {}

  render() {
    let { date, value, comment } = this.props;

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
        <EntryValueDisplay value={value} />
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

const EntryValueDisplay = ({ value }) => {
  return (
    <div
      className={css`
        height: 2em;
        grid-column: 2;
        border: var(--border);
      `}
    >
      <div
        className={css`
          height: 100%;
          width: ${value}%;
          border-right: var(--border);
          background: var(--tone-light);
        `}
      />
    </div>
  );
};
