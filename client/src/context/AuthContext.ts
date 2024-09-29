import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isLoading: true,
  user: null,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/user", {
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        set({ isLoggedIn: true, user: userData, isLoading: false });
        console.log(userData);
      } else {
        set({ isLoggedIn: false, user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ isLoggedIn: false, user: null, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      set({ isLoggedIn: false, user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useAuthStore;
