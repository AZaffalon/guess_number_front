import {useContext, useEffect, useState} from "react";
import {isTokenValid} from "../routes/root.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import '../assets/rank.css'

export default function Rank() {
    const authToken = localStorage.getItem('authToken');

    const [rankList, setRankList] = useState([])
    const [users, setUsers] = useState([])

    /**
     * Find corresponding user nickname
     * @param rank_uuid_string
     * @returns {Promise<*>}
     */
    const getUserNickname = (rank_uuid_string) => {
        const split_rank_uuid = rank_uuid_string.split('/')
        const rank_uuid = split_rank_uuid[split_rank_uuid.length -1]

        const user = users.find(user => user.uuid === rank_uuid )

        return user && (user.nickname !== undefined) ? user.nickname : "Inconnu"
    }

    /**
     * Call api to save all users in useState
     * @returns {Promise<void>}
     */
    async function getAllUsers() {
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        })
        if(response.ok) {
            const data = await response.json()
            setUsers(data)
        } else (
            console.error("Error fetching all users")
        )
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOST_URL}/api/rank`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("Error while fetching data")
            })
            .then(async data => {
                setRankList(data)
                if (isTokenValid(authToken)) {
                    await getAllUsers()
                }
            })
            .catch(err => console.error(err) )
    }, []);


    return (
        <div className="rank">
            <h1>LE CLASSEMENT</h1>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Utilisateur</th>
                        <th>Tentatives</th>
                        <th>Temps</th>
                        <th>Nombre à trouver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rankList.map(rank => {
                            return(
                                <tr className="border" key={rank.uuid}>
                                    <td>{rank.uuid}</td>
                                    <td>
                                        {
                                            isTokenValid(authToken) ? getUserNickname(rank.user) : "Anonyme"
                                        }
                                    </td>
                                    <td>{rank.attempts}</td>
                                    <td>{rank.time.toFixed(1)} sec</td>
                                    <td>
                                        { rank.numberToFind || <FontAwesomeIcon icon={faClock} /> }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
