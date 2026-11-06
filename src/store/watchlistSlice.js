// Import all dependencies
import { createSlice } from '@reduxjs/toolkit'

// Location in the local storage where the watchlist will be stored
const LOCAL_STORAGE_KEY = "city_watchlist";

// Function to load from local storage if available
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load watchlist from local storage:", error);
    return [];
  }
}

// Helper function to save a city to the local storage
const saveCitiesToLocalStorage = (cities) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cities)); // Saves the cities to localStorage as a JSON string
  } catch (error) {
    console.error("Could not save cities to localStorage", error);
  }
};

// Initial state is loaded from local storage if available
const initialState = {
  items: loadFromLocalStorage()
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.items.push(action.payload);
      saveCitiesToLocalStorage(state.items);
    },
    removeCity: (state, action) => {
      state.items = state.items.filter(city => {
        const cityName = typeof city === 'object' ? city.name : city;
        return cityName !== action.payload;
      });
      saveCitiesToLocalStorage(state.items);
    },
    clearWatchlist: (state) => {
        state.items = [];
        saveCitiesToLocalStorage(state.items);
    },
  },
});

export const { addCity, removeCity, clearWatchlist } = watchlistSlice.actions
export default watchlistSlice.reducer