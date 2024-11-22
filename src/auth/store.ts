import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    jwt: null,

    setUser: (user) => set({ user }),
    setJwt: (jwt) => set({ jwt }),

    logout: () => set({ user: null, jwt: null }),
}));
