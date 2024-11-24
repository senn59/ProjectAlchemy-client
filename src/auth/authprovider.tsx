import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { User } from "@supabase/supabase-js";

interface AuthState {
    user: User | null;
    jwt: string | null;
    setUser: (user: User | null) => void;
    setJwt: (jwt: string | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("auth-user");
        return savedUser ? JSON.parse(savedUser) : undefined;
    });
    const [jwt, setJwt] = useState<string | null>(() => {
        return localStorage.getItem("auth-jwt");
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("auth-user", JSON.stringify(user));
        } else {
            localStorage.removeItem("auth-user");
        }
    }, [user]);

    useEffect(() => {
        if (jwt) {
            localStorage.setItem("auth-jwt", jwt);
        } else {
            localStorage.removeItem("auth-jwt");
        }
    }, [jwt]);

    const logout = () => {
        setUser(null);
        setJwt(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                jwt,
                setUser,
                setJwt,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
