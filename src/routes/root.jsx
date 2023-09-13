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

/**
 * Find corresponding user nickname
 * @param rank_uuid_string
 * @returns {Promise<*>}
 */
export const getUserNickname = (users, rank_uuid_string) => {
    const split_rank_uuid = rank_uuid_string.split('/')
    const rank_uuid = split_rank_uuid[split_rank_uuid.length -1]

    const user = users.find(user => user.uuid === rank_uuid )

    return user && (user.nickname !== undefined) ? user.nickname : "Inconnu"
}


export default function Root() {

    const [currentToken, setCurrentToken] = useState(null)
    const [users, setUsers] = useState([])


    /**
     * Call api to save all users in useState
     * @returns {Promise<void>}
     */
    async function getAllUsers(token) {
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        if(response.ok) {
            const data = await response.json()
            setUsers(data)
        } else (
            console.error("Error fetching all users")
        )
    }

    // Get authentication token
    useEffect( () => {
        const storedToken = localStorage.getItem('authToken')

        if(storedToken) {
            setCurrentToken(storedToken)
            getAllUsers(storedToken)
        }
    }, []);

    return (
        <CurrentTokenContext.Provider value={{
            currentToken,
            setCurrentToken,
            users
        }}>
            <Navbar />
                <Outlet />
            <Footer />
        </CurrentTokenContext.Provider>
    )
}
