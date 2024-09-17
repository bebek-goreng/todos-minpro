import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    token: null,
    setLoginStatus: (status) => set({ isLoggedIn: status }),
    setToken: (token) => set({ token }),
}));

export default useAuthStore;