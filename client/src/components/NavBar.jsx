import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation(); // Get the current location (URL)
  
  const isActive = (path) => location.pathname === path ? 'text-green-500' : 'hover:text-green-500'; // Function to check if the link is active
  
  return (
    <div className="bg-gray-900 text-white px-6 py-4 fixed top-0 left-0 w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-semibold text-green-500">Dashboard</div>
        <div className="space-x-6">
          <Link to="/" className={`${isActive('/')}`}>Home</Link>
          <Link to="/campaigns" className={`${isActive('/campaigns')}`}>Campaigns</Link>
          <Link to="/invoices" className={`${isActive('/invoices')}`}>Invoices</Link>
          <Link to="/account-settings" className={`${isActive('/account-settings')}`}>Account Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
