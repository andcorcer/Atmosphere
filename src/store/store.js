// Import all dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import Reducers
import weatherReducer from "./weatherSlice";
import watchlistReducer from "./watchlistSlice";
import themeReducer from "./themeSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    watchlist: watchlistReducer,
    theme: themeReducer,
  },
});