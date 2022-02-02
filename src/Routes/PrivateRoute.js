import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Home from "../Components/Home/Home";

function PrivateRoute() {
  let location = useLocation();
  const { isLogged } = useSelector((state) => state.user.value);

  if (isLogged) {
    return <Home />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
export default PrivateRoute;
