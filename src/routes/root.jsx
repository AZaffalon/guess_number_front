/**
 * Serve as a layout for all the app
 */
import jwtDecode from 'jwt-decode';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import {createContext, useEffect, useState} from "react";

export const CurrentTokenContext = createContext(null)

/**
 * Check Bearer token validity
 * @param {*} token
 * @returns boolean
 */
export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in seconds

        return decodedToken.exp > currentTime;
    } catch(error) {
        // Invalid or expired token
        return false;
    }
}


export default function Root() {

    const [currentToken, setCurrentToken] = useState(null)

    // Get authentication token
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken')

        if(storedToken) {
            setCurrentToken(storedToken)
        }
    }, []);

    return (
        <CurrentTokenContext.Provider value={{
            currentToken,
            setCurrentToken
        }}>
            <Navbar />
                <Outlet />
            <Footer />
        </CurrentTokenContext.Provider>
    )
}
