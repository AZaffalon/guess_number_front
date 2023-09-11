import '../assets/game.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import {useContext, useState} from 'react'
import {CurrentTokenContext, isTokenValid} from "../routes/root.jsx";

export default function Game() {
    const [newAttempt, setNewAttempt] = useState()
    const [responseData, setResponseData] = useState()
    const { currentToken } = useContext(CurrentTokenContext)

    /**
     * Call the api after verifying the auth token and return the response
     * @param e
     * @returns {Promise<void>}
     */
    async function handleSubmit(e) {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');

        // Verify auth token validity before calling the API
        if (isTokenValid(authToken)) {
            const response = await fetch(`${import.meta.env.VITE_HOST_URL}/api/game`, {
                method: 'POST',
                body: JSON.stringify(newAttempt),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${currentToken}`
                }
            })

            if(response.ok) {
                const data = await response.json();
                console.log("data : ", data)

                setResponseData(data);
            } else {
                console.error("Problem fetching data")
            }
        } else {
            console.error('Invalid or expired token. Please log in.');
        }
    }

    return currentToken ? (
        <div className="game">
            <h1>EXPRESS BRAINS</h1>

            <p className='explanation'>Découvrez en un minimum de tour le nombre qui se cache derrière la carte mystère !</p>

            <div className="container">
                <FontAwesomeIcon icon={faCircleQuestion} />

                <h3>Qui suis-je ?</h3>
                <p>Quel nombre se cache derrière cette carte mystère ?</p>
                <input type="number"
                    name="attempt"
                    id="attempt"
                    placeholder='?'
                    min={0}
                    onChange={(e) =>
                        setNewAttempt({ ...newAttempt, attempt: e.target.value })
                    }
                />

                {
                    responseData && (
                        <p className={responseData.inProgress ? "false" : "success"}>
                            { responseData.resultText }
                        </p>
                    )
                }

                <button type='submit' onClick={handleSubmit}>J'ai trouvé !</button>
            </div>

        </div>
    ) : (
        <div className="game">
            <h1>EXPRESS BRAINS</h1>

            <p className='explanation'>Découvrez en un minimum de tour le nombre qui se cache derrière la carte mystère !</p>

            <div className="container">
                <FontAwesomeIcon icon={faCircleQuestion} />

                <h3>Qui suis-je ?</h3>
                <p>Quel nombre se cache derrière cette carte mystère ?</p>
                <input type="number"
                       name="attempt"
                       id="attempt"
                       placeholder='?'
                       min={0}
                       disabled
                />
                <p className="false">Vous devez vous connecter pour jouer</p>
                <button type='submit' disabled>J'ai trouvé !</button>
            </div>

        </div>
    )
}
