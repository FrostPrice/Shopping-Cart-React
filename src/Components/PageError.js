import React from "react";
import "../Styles/pageError.css";

function PageError() {
  return (
    <div className="div--error-page_container">
      <h1 className="h1--error-page_tittle">Oops!</h1>
      <h3 className="h3--error-page_message">404 error: Page not Found :(</h3>
    </div>
  );
}

export default PageError;
