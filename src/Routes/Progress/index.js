import React from "react";
import styled, { css } from "react-emotion";
import ProgressField from "./Components/ProgressField";
import { getNoiseTone } from "../../Utils";

export default class Component extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <div>
        <h1>Progress Record</h1>
        <ProgressField value={30} />
      </div>
    );
  }
}
