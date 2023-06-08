import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Admin_PrivateRoute = ({ children }) => {
  const { logindata } = useSelector((state) => state.reducer.LoginSlice);

  if (
    logindata?.data?.user_type === "admin" ||
    logindata?.data?.user_type === "super-admin"
  ) {
    return children;
  } else {
    return <Navigate to={`/afrisport/${logindata?.data?.user_type}/profile`} />;
  }
};

export const Clinet_PrivateRoute = ({ children }) => {
  const { logindata } = useSelector((state) => state.reducer.LoginSlice);

  if (logindata?.data?.user_type === "admin") {
    // return children;
    return <Navigate to={`/admin/dashboard`} />;
  } else {
    return children;

    // return <Navigate to={`/afrisport/${logindata?.data?.user_type}/profile`} />;
  }
};

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
