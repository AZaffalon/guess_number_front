import { Link, useNavigate } from "react-router-dom";
import '../assets/login.css'
import { useState } from "react";

export default function Login() {
    const [user, setUser] = useState();
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();
        await fetch(`${import.meta.env.VITE_HOST_URL}/api/authentication_token`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/');
    }

    return(
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>
                <div className="wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                    name="email" 
                    id="email" 
                    onChange={(e) =>
                        setUser({...user, email: e.target.value})
                    }/>
                </div>

                <div className="wrapper">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="text" 
                        name="password" 
                        id="password" 
                        onChange={(e) =>
                            setUser({...user, password: e.target.value})
                        }/>
                </div>

                <button type="submit" className="bg--blue">Se connecter </button>
                <div>----</div>
                <Link to="/signup">
                    <button className="bg--green">Créer un compte</button>
                </Link>
            </form>
        </>
    )
}