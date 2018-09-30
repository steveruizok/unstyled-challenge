import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as Styles from "./styles";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
