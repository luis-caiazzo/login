import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Main from "../views/Main";

export default function PrivateRoute() {

  const { token } = useSelector((store) => store.auth);
  console.log("LC_log Private Route: ", token, !!token)

  return token ? <Main /> : <Navigate to="/login" />;
}
