import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, // Initial state: no user logged in
      setUser: (user: User | null) => set({ user }), // Action to set the user
      clearUser: () => set({ user: null }), // Action to clear the user
    }),
    {
      name: "user-storage", // Unique name for the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export default useUserStore;
