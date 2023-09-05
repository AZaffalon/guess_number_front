/**
 * Serve as a layout for the all app 
 */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <Navbar />
                <Outlet />
            <Footer />
        </>
    )
}