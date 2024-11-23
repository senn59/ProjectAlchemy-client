import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/authprovider.tsx";

const Protected = () => {
    const { jwt } = useAuth();

    return jwt ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default Protected;
