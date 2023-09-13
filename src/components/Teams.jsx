import {useContext, useEffect, useState} from "react";
import {CurrentTokenContext, getUserNickname} from "../routes/root.jsx";

import '../assets/teams.css'


export default function Teams() {
    const [teams, setTeams] = useState([])
    const { users } = useContext(CurrentTokenContext)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOST_URL}/api/teams`)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("Error while fetching data")
            })
            .then(data => {
                setTeams(data)
            })
    }, []);

    /**
     * Déplacer getAllUsers() dans root.jsx pour que le state puisse être partagé
     */
    return(
        <div className="teams">
            <h1>Liste des équipes</h1>

            {
                teams.map(team => {
                    return(
                        <div className="teams-container" key={team.uuid}>
                            <h2>{team.name}</h2>
                            <h3>Membres :</h3>
                            {
                                team.members.map((member, index) => {
                                    return(
                                        <p key={index}>- {getUserNickname(users, member) || "Inconnu"}</p>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
