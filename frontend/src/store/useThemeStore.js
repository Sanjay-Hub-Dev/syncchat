import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("syncchat-theme") || "light",

  setTheme: (theme) => {
    localStorage.setItem("syncchat-theme", theme);
    set({ theme });
  },
}));