/**
 * Serve as a layout for the all app 
 */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Root() {
    return (
        <>
            <Navbar />
                <p>le reste des composants sera importés entre ces 2 éléments</p>
            <Footer />
        </>
    )
}