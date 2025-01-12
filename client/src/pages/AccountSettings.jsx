import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';

function AccountSettings() {
  const { user, logout,backendUrl } = useContext(AppContext);
  
 
  const [input, setInput] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState(user.phoneNumber || '');
  const [value ,setValue] = useState(user.phoneNumber);
 
  const savePhoneNumber = async() => {
    if (tempPhoneNumber === user.phoneNumber) {
      alert('No changes made to phone number');
      setInput(false);
      setTempPhoneNumber("")  
    } 
    const userId = user._id;
    try {
      const {data} = await axios.post(`${backendUrl}/api/user/update/phoneNumber`,{userId,data:tempPhoneNumber});
      if(data.success){
       setValue(tempPhoneNumber);
       setInput(false);
       tempPhoneNumber("");
      }
      else {
       alert(data.message);
       console.log("Error occured while saving details")
      }
    } catch (error) {
      console.log(error);
    }
     
    
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">
          Account Settings
        </h2>

        <div className="space-y-4">
          <div className="text-lg">
            <span className="font-bold">Welcome, </span>
            {user.firstName} {user.lastName}
          </div>
          <div className="text-lg">
            <span className="font-bold">Email: </span>
            {user.email}
          </div>
          {
            !input ? (
              <div className='flex gap-10 items-center'>
                <div className="text-lg">
                  <span className="font-bold">Phone: </span>
                  {value || 'Not provided'}
                </div>
                <button 
                  onClick={() => setInput(true)} 
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className='flex gap-4 items-center'>
                <input
                  type="number"
                  value={tempPhoneNumber}
                  onChange={(e) => setTempPhoneNumber(e.target.value)}
                  className="border rounded p-1 text-black"
                  placeholder="Enter phone number"
                />
                <button 
                  onClick={savePhoneNumber} 
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button 
                  onClick={() => setInput(false)} 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            )
          }
          <div className="text-lg">
            <span className="font-bold">PAN Card Number: </span>
            {user.panCardNumber || 'Not provided'}
          </div>
          <div className="text-lg">
            <span className="font-bold">Address: </span>
            {user.address || 'Not provided'}
          </div>
          <div className="mt-6">
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
