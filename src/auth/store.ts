import { create } from "zustand";

interface AuthState {
    user: string | null;
    jwt: string | null;
    setUser: (user: string | null) => void;
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
