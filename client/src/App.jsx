import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContext } from './context/AppContext.jsx';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import LoginForm from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import Invoices from './pages/Invoices.jsx';
import Campaigns from './pages/Campaigns.jsx';
import UploadCampaigns from './pages/UploadCampaigns.jsx';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div>
      {isLoggedIn && <NavBar />}  {/* Show NavBar only if logged in */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Routes */}
        <Route
          path="/account-settings"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-campaigns"
          element={
            <ProtectedRoute>
              <UploadCampaigns />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
