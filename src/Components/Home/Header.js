import React from "react";
import { useDispatch } from "react-redux";

import "../../Styles/Home/home.css";

import { logout } from "../../Features/user";

function Header() {
  const dispatch = useDispatch();
  const name = sessionStorage.getItem("username");

  return (
    <header className="header--home-page">
      <h5 className="h5--home-page_title">
        Welcome back <span className="span--user-name">{name}</span>
      </h5>
      <nav>
        <button className="btn--logout" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
