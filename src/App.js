import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './Pages/LandingHomepage/HomePage';
import Login from './Pages/Login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Signup from './Pages/SignUp/Signup';
import CreateAccount from './Pages/SignUp/CreateAccount';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create-account/:id' element={<CreateAccount />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
