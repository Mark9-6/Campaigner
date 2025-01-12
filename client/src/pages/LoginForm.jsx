import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AppContext} from '../context/AppContext.jsx'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const {backendUrl ,setToken , setShowLogin,setUser,setIsLoggedIn} = useContext(AppContext);
  // console.log(backendUrl) 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

     
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try { 
      const {data} = await axios.post(backendUrl + '/api/user/login' , {
        email,password
      })
      // console.log(data) 
      if (data.success) {
        setSuccess(true);
        setShowLogin(false);
        setError("");
        setUser(data.user);
        setIsLoggedIn(true);
        setToken(data.token); 
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/")  
      } else {
        setError( data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div 
    style={{ backgroundImage: 'url(/assets/homeImage.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className=" bg-slate-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Login</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">Login successful! Redirecting...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              required
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-600 cursor-pointer font-semibold hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
