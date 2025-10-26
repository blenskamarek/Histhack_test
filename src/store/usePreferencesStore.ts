import { create } from 'zustand';

type PreferencesState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const usePreferencesStore = create<PreferencesState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),
}));
