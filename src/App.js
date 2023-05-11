import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./Pages/LandingHomepage/HomePage";
import Login from "./Pages/Login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signup from "./Pages/SignUp/Signup";
import CreateAccount from "./Pages/SignUp/CreateAccount";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ScoutDeal from "./Components/Scout/ScoutDeal";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import PrivateRoute from "./Pages/PrivateRoutes.js/PrivateRoute";
import ScoutRoute from "./Pages/Scout/ScoutRoute";
import AdminRote from "./Pages/Admin/AdminRote";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ScoutViewProfile from "./Pages/Scout/ScoutViewProfile";
import Scout from "./Pages/Scout/Scout";
import "./main.scss";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-account/:id" element={<CreateAccount />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/setPassword" element={<ResetPassword />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminRote />
              </PrivateRoute>
            }
          />
          <Route
            path="/afrisport/*"
            element={
              <PrivateRoute>
                <ScoutRoute />
              </PrivateRoute>
            }
          />
          {/* <Route path='/afrisports/*' element={
        <PrivateRoute>
          <Scout />
        </PrivateRoute>
        } /> */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
