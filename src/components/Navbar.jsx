import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'


import '../assets/navbar.css'

export default function Navbar() {

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
                    <NavLink to="/login"  className={({ isActive }) => isActive ? "active" : "not-current"}>Connexion</NavLink>
                    <FontAwesomeIcon icon={faCircleUser} />
                </div>
            </nav>
        </div>
    )
}