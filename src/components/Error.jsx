import { useRouteError } from "react-router-dom";
import '../assets/error.css'

export default function Error() {
    const error = useRouteError();
    console.log(error)

    return (
        <div className="error">
            <h1>Oups...</h1>
            <h2>Il semblerait qu'il y ait une erreur</h2>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}