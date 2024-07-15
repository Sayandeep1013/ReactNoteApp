import React from "react";
import ReactDOM from "react-dom";
import NoteApp from "./NoteApp";
import { createGlobalStyle, StyleSheetManager } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <NoteApp />
  </>,
  document.getElementById("root")
);
