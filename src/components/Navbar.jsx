import { Link } from 'react-router-dom'
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
                        <Link to="..">Jouer</Link>
                    </li>
                    <li>
                        <Link to="/rank">Classement</Link>
                    </li>
                    <li>
                        <Link to="/teams">Equipes</Link>
                    </li>
                </ul>

                <div className='login'>
                    <Link to="/login">Connexion</Link>
                    <FontAwesomeIcon icon={faCircleUser} />
                </div>
            </nav>
        </div>
    )
}