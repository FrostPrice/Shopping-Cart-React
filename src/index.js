import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./Features/user.js";

/////////////////////////////////////////////////////
//// Create a Shopping cart, and save the itens on the cart at a Server (JSON-server)
//// Have different users, and each user has it's own cart with different itens // NEED TO SEE IF IT'S POSSIBLE WITH THIS JSON-SERVER
//// Implement Redux and React Router
/////////////////////////////////////////////////////

const store = configureStore({
  reducer: { user: userReducer },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
