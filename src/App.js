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
import PrivateRoute, {
  Admin_PrivateRoute,
  Clinet_PrivateRoute,
} from "./Pages/PrivateRoutes.js/PrivateRoute";
import ScoutRoute from "./Pages/Scout/ScoutRoute";
import AdminRote from "./Pages/Admin/AdminRote";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ScoutViewProfile from "./Pages/Scout/ScoutViewProfile";
import Scout from "./Pages/Scout/Scout";
import HomepageFilterView from "./Pages/LandingHomepage/HomepageFilterView";
import HomeViewPlayerProfile from "./Components/Player/HomeViewPlayerProfile";
import VerifiedSignup from "./Pages/SignUp/VerifiedSignup";
import TalentmanagerRoute from "./Pages/TalentManagers/TalentmanagerRoute";
import RecommendedFilterView from "./Pages/LandingHomepage/RecommendedFilterView";
import TopratedPlayersFilterView from "./Pages/LandingHomepage/TopratedPlayersFilterView";
import HomePricingScreen from "./Pages/LandingHomepage/HomePricingScreen";


function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/verify" element={<VerifiedSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricingpage" element={<HomePricingScreen />} />
          <Route path="/create-account/:id" element={<CreateAccount />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/setPassword" element={<ResetPassword />} />
          <Route path="/filterPage" element={<HomepageFilterView />} />
          <Route path="/recommendedPage" element={<RecommendedFilterView />} />
          <Route path="/topRatedPlayerPage" element={<TopratedPlayersFilterView />} />

          <Route
            path="/viewplayerprofile/:id"
            element={<HomeViewPlayerProfile />}
          />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Admin_PrivateRoute>
                  <AdminRote />
                </Admin_PrivateRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/afrisport/*"
            element={
              <PrivateRoute>
                <Clinet_PrivateRoute>
                  <ScoutRoute />
                </Clinet_PrivateRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/afrisport/talent-manager/*"
            element={
              <PrivateRoute>
                <Clinet_PrivateRoute>
                  <TalentmanagerRoute />
                </Clinet_PrivateRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
