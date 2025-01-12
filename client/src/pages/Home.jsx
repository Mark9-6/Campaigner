import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AppContext);  // Destructure isLoggedIn from context
  //  console.log(user)
  //  console.log(isLoggedIn)
  const onClickHandler = (state) => {
    if (state === 'Login') {
      navigate('/login');
    }
    if (state === 'Register') {
      navigate('/register');
    }
  };

  return (
    <div 
    style={
      !isLoggedIn
        ? { backgroundImage: `url(/assets/homeImage.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {}
    }
    className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="text-4xl font-bold text-center text-green-600 mb-4 px-6 py-4 bg-black rounded-lg shadow-lg">
        {isLoggedIn && user ? (
          `Welcome , ${user.firstName}`
        ) : (
          "Welcome to Campaign Manager"
        )}
      </div>



      {/* Conditionally render Login/Register based on isLoggedIn */}
      {!isLoggedIn && (
        <div>
          <div className="bg-white hover:bg-black transition-all p-6 rounded-lg shadow-lg mb-4 w-full max-w-md">
            <div
              className="cursor-pointer text-xl font-semibold text-gray-700 mb-4 hover:text-white"
              onClick={() => onClickHandler('Register')}
            >
              New User? Register Here
            </div>
          </div>

          <div className="bg-white hover:bg-black transition-all p-6 rounded-lg shadow-lg w-full max-w-md">
            <div
              className="cursor-pointer text-xl font-semibold text-gray-700 mb-4 hover:text-white"
              onClick={() => onClickHandler('Login')}
            >
              Have an account? Login
            </div>
          </div>
        </div>
      )}
      <div>
       

      </div>
    </div>
  );
}

export default Home;
