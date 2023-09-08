import jwtDecode from 'jwt-decode';

import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'


import '../assets/navbar.css'
import {useContext} from "react";
import {CurrentTokenContext} from '../routes/root.jsx'
import { isTokenValid } from "../routes/root.jsx";

export default function Navbar() {

    const { currentToken } = useContext(CurrentTokenContext)

    return(
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <h3>Express Brain</h3>
                    </li>
                    <li>
                        <NavLink to=".." className={({ isActive }) => isActive ? "active" : "not-current"}>Jouer</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rank"  className={({ isActive }) => isActive ? "active" : "not-current"}>Classement</NavLink>
                    </li>
                    <li>
                        <NavLink to="/teams" className={({ isActive }) => isActive ? "active" : "not-current"}>Equipes</NavLink>
                    </li>
                </ul>

                <div className='login-nav'>
                    {
                        isTokenValid(currentToken) ? (
                            <>
                                <p>Connecté</p>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login"  className={({ isActive }) => isActive ? "active" : "not-current"}>Connexion</NavLink>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}
