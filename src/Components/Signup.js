import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../Styles/signup.css";
import { login } from "../Features/user";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState(user);

  const registerUser = async () => {
    const url = "http://localhost:5000/register";
    const FETCH_OBJ_CONFIG = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userData.username,
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
          username: userData.username,
          email: userData.email,
          password: userData.password,
          accessToken: data.accessToken,
        })
      );
      navigate("/");
    } else {
      console.error("Error: Something went wrong :(");
    }
  };

  return (
    <div className="div--signup-page">
      <h1 className="h1--signup-title">SignUp</h1>
      <form className="form--signup-container">
        <input
          className="input--signup username"
          type="text"
          placeholder="Username"
          onChange={(event) =>
            setUserData({ ...userData, username: event.target.value })
          }
          required
        />
        <input
          className="input--signup email"
          type="email"
          placeholder="E-mail"
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value })
          }
          required
        />
        <input
          className="input--signup password"
          type="password"
          placeholder="Password"
          onChange={(event) =>
            setUserData({ ...userData, password: event.target.value })
          }
          required
        />
        <button
          className="btn--signup submit"
          type="submit"
          onClick={(event) => {
            if (!userData) return;
            event.preventDefault();
            registerUser();
          }}
        >
          Create Account
        </button>
      </form>
      <p>
        Already have an Account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
