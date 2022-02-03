import React from "react";
import "../../Styles/Home/footer.css";

function Footer({ total }) {
  return (
    <footer className="footer--container">
      <h3>TOTAL: ${total}</h3>
    </footer>
  );
}

export default Footer;
