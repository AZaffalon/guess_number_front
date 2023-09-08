import { Link, useNavigate } from "react-router-dom";
import '../assets/login.css'
import {useState} from "react";

export default function Login() {
    const [user, setUser] = useState(); // TODO => currentUser not used yet
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST_URL}/api/authentication_token`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(response.ok) {
                const data = await response.json();
                const token = data.access_token

                localStorage.setItem('authToken', token)

                navigate('/');
            } else {
                console.error("Échec de l'authentification")
            }
        } catch(error) {
            console.error('Il y a une erreur', error)
        }
    }

    return(
        <div className="login">
            <h1>Connexion</h1>

            <form className={'form-login'} onSubmit={handleSubmit}>
                <div className="wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        name="email"
                        id="email"
                        onChange={(e) =>
                            setUser({...user, email: e.target.value})
                        }
                        required
                    />
                </div>

                <div className="wrapper">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password"
                        name="password"
                        id="password"
                        onChange={(e) =>
                                setUser({...user, password: e.target.value})
                        }
                        required
                    />
                </div>

                <button type="submit" className="bg--blue">Se connecter </button>
                <div>----</div>
                <Link to="/signup">
                    <button className="bg--green">Créer un compte</button>
                </Link>
            </form>
        </div>
    )
}
