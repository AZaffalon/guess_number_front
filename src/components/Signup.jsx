import { useState } from "react"
import { useNavigate } from "react-router-dom";
import '../assets/signup.css'

export default function Signup() {
    const [newUser, setNewUser] = useState();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        await fetch(`${import.meta.env.VITE_HOST_URL}/api/users`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    return (
        <div className="signup">
            <h1>CRÉER UN COMPTE</h1>

            <form className={'form-signup'} onSubmit={handleSubmit}>
                <div className="wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                        name="email" 
                        id="email" 
                        onChange={(e) => 
                                setNewUser({...newUser, email: e.target.value})
                            }
                            required
                        />
                </div>

                <div className="wrapper">
                    <label htmlFor="nickname">Pseudo</label>
                    <input type="text" 
                        name="nickname" 
                        id="nickname" 
                        onChange={(e) => 
                            setNewUser({...newUser, nickname: e.target.value})
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
                            setNewUser({...newUser, password: e.target.value})
                        }
                        required
                    />
                </div>

                <div className="wrapper">
                    <label htmlFor="passwordConfirmation">Confirmer le mot de passe</label>
                    <input type="password" 
                        name="passwordConfirmation" 
                        id="passwordConfirmation" 
                        onChange={(e) => 
                            setNewUser({...newUser, passwordConfirmation: e.target.value})
                        }
                        required
                    />
                </div>

                <button type="submit">Créer un compte</button>
            </form>
        </div>
    )
}