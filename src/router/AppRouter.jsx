import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Login from '../views/Login';
import Main from '../views/Main'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
            <Route exact path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
