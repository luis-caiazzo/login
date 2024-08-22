import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PublicRoute() {
  const location = useLocation();
  const { token } = useSelector((store) => store.auth);
  console.log("LC_log Public Route: ", token, !!token);

  return !token ? (
    <Container>
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/" />
  );
}
