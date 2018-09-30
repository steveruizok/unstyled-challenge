import React from "react";
import ProgressField from "./Components/ProgressField";
import Entry from "./Components/Entry";

export default () => {
  return (
    <div>
      <h1>Progress Record</h1>
      <h3>Current</h3>
      <ProgressField value={30} />
      <h3>History</h3>
      <Entry comment="This is a very long comment, intended to break over multiple lines in order to demonstrate the 'show more' and 'show less' features of the EntryComent class. This is a very long comment, intended to break over multiple lines in order to demonstrate the 'show more' and 'show less' features of the EntryComent class." />
      <Entry comment="" />
      <Entry />
      <Entry />
      <Entry />
    </div>
  );
};
