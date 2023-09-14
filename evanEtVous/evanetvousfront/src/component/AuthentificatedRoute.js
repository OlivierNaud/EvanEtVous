import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import Auth from "./contexts/Auth";

const AuthentificatedRoute = ({ path, component }) => {
  const auth = useContext(Auth);

  return auth.tokenData ? (
    <Route exact path={path} component={component} />
  ) : (
    <Navigate to="/connection" />
  );
};

export default AuthentificatedRoute;
