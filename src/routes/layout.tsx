import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex">
                <Outlet />
            </div>
        </div>
    );
}
export default Layout;
