import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'


import '../assets/navbar.css'
import {useContext} from "react";
import {CurrentTokenContext} from '../routes/root.jsx'
import { isTokenValid } from "../routes/root.jsx";

export default function Navbar() {

    const { currentToken, setCurrentToken } = useContext(CurrentTokenContext)

    function handleLogout() {
        localStorage.removeItem('authToken')
        setCurrentToken(null)
    }

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
                            <Link to={"/"}
                                  onClick={handleLogout}
                                  className={"not-current"}
                            >
                                Se Déconnecter
                            </Link>
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
