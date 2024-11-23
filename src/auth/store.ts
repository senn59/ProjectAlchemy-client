import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface AuthState {
    user: User | null;
    jwt: string | null;
    setUser: (user: User | null) => void;
    setJwt: (jwt: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    jwt: null,

    setUser: (user) => set({ user }),
    setJwt: (jwt) => set({ jwt }),

    logout: () => set({ user: null, jwt: null }),
}));
