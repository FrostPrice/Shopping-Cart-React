import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as IconShoppingCart } from "../SVG/Shopping-Cart-Icon.svg";
import "../Styles/login.css";
import { login } from "../Features/user";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState(user);

  const loginUser = async () => {
    const url = "http://localhost:5000/login";
    const FETCH_OBJ_CONFIG = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    };

    const res = await fetch(url, FETCH_OBJ_CONFIG);
    if (res.ok === true) {
      const data = await res.json();
      dispatch(
        login({
          ...user,
          email: userData.email,
          password: userData.password,
          username: data.user.username,
          accessToken: data.accessToken,
        })
      );
      navigate("/");
    } else {
      console.error("Error: Something went wrong :(");
    }
  };

  return (
    <div className="div--login-page">
      <IconShoppingCart className="icon--shopping-cart" />
      <form className="form--login-container">
        <input
          className="input--login email"
          type="email"
          placeholder="E-mail"
          onChange={(event) =>
            setUserData({
              ...userData,
              email: event.target.value.toLowerCase(),
            })
          }
          required
        />
        <input
          className="input--login password"
          type="password"
          placeholder="Password"
          onChange={(event) =>
            setUserData({
              ...userData,
              password: event.target.value,
            })
          }
          required
        />
        <button
          className="btn--login submit"
          type="submit"
          onClick={(event) => {
            if (!userData.email || !userData.password) return;
            event.preventDefault();
            loginUser();
          }}
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
