import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/auth/store";

const Protected = () => {
    const store = useAuthStore();

    return store.jwt ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default Protected;
