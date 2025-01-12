import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token')); // Check for token on load

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
    // Check for login state when component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/user/login', { email, password });
             const token = data.token;           // from server side  
            const user = data.user;
           console.log(user); 
            if (token && user) {
                // Save token and user to localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Set state
                setToken(token);
                setUser(user);
                setIsLoggedIn(true);

                navigate("/"); // Redirect to home or dashboard after login
            }
        } catch (error) {
            console.error("Login failed:", error);
            // Optionally handle errors (e.g., show error messages)
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        setUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    const value = {
        logout,
        login,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        user,
        setToken,
        token,
        isLoggedIn,
        setIsLoggedIn
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
