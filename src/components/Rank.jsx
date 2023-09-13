import {useContext, useEffect, useState} from "react";
import {CurrentTokenContext, isTokenValid, getUserNickname} from "../routes/root.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import '../assets/rank.css'

export default function Rank() {
    const authToken = localStorage.getItem('authToken');
    const { users } = useContext(CurrentTokenContext)

    const [rankList, setRankList] = useState([])

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
                                            isTokenValid(authToken) ? getUserNickname(users, rank.user) : "Anonyme"
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
