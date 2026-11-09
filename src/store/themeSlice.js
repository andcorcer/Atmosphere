// Import all dependencies
import { createSlice } from '@reduxjs/toolkit'

// Location in the local storage where the watchlist will be stored
const LOCAL_STORAGE_KEY = "app_theme";

// Function to load from local storage if available
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (error) {
    console.error("Failed to load theme from local storage:", error);
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
}

// Helper function to save the theme to the local storage
const saveThemeToLocalStorage = (theme) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(theme)); // Saves the theme to localStorage as a JSON string
  } catch (error) {
    console.error("Could not save theme to localStorage", error);
  }
};

// Initial state is loaded from local storage if available
const initialState = {
  theme: loadFromLocalStorage()
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      saveThemeToLocalStorage(state.theme);
    },
  },
});

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer