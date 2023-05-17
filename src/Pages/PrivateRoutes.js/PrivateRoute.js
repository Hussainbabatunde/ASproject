import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// import { history } from '_helpers';
function PrivateRoute({ children }) {
  const { logindata } = useSelector((state) => state.reducer.LoginSlice);

  console.log(logindata);

  if (!logindata?.data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;

    console.log("cant come here");
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
