import "./Styles/app.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { keepLogged } from "./Features/user";

import PageError from "./Components/PageError";
import PrivateRoute from "./Routes/PrivateRoute";
import Home from "./Components/Home/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  if (token) {
    dispatch(keepLogged());
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageError />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
