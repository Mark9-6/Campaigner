import React, { useState , useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AppContext} from '../context/AppContext.jsx'
 

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    panCardNumber: "",
    password: "",
  });

  const {backendUrl ,setToken , setShowLogin,setUser,setIsLoggedIn} = useContext(AppContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phoneNumber, panCardNumber, password } = formData;

    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !panCardNumber || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const {data} = await axios.post(backendUrl + '/api/user/register', {
        firstName,
        lastName,
        email,
        phoneNumber,
        panCardNumber,
        password,
      });
      console.log(data.success)
      console.log(data.user)
      if (data.success) {
        setSuccess(true);
        setShowLogin(false);
        setError("");
        setUser(data.user);
        setToken(data.token); 
        setIsLoggedIn(true)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
         navigate("/") // Redirect to login after 2 seconds
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div 
    style={{ backgroundImage: 'url(/assets/homeImage.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    className=" min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-slate-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Register</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">Registration successful! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input
              placeholder="John"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input
            placeholder="Doe"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
            placeholder="ex:john@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">PAN Card Number</label>
            <input
              type="text"
              name="panCardNumber"
              value={formData.panCardNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              required
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
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 cursor-pointer font-semibold hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;