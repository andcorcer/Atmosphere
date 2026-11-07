// Import all dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchCityCoordinates from "../utilities/geocodingApi";
import fetchForecast from "../utilities/forecastApi";

// Async thunk to fetch weather data for a given city
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ cityName, count }, { rejectWithValue }) => {
    try {
      const cities = await fetchCityCoordinates(cityName, count);
      const results = [];
      for (const city of cities) {
        const { latitude, longitude, name } = city;
        const forecast = await fetchForecast(latitude, longitude);
        results.push({ name, latitude, longitude, ...forecast });
      }
      return results; // Return an array of all city forecasts
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to fetch weather data for all default cities
export const fetchDefaultCitiesWeather = createAsyncThunk(
  "weather/fetchDefaultCitiesWeather",
  async ({ defaultCities }, { rejectWithValue }) => {
    try {
      const results = [];
      for (const cityName of defaultCities) {
        const cities = await fetchCityCoordinates(cityName, 1);
        if (cities && cities.length > 0) {
          const { latitude, longitude, name } = cities[0]; // Take only the first city from the results
          const forecast = await fetchForecast(latitude, longitude);
          results.push({ name, latitude, longitude, ...forecast });
        }
      }
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Initial state
const initialState = {
  selectedCity: null,
  searchResults: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  units: "celsius", // Default unit for temperature measurements, can be 'celsius' || 'fahrenheit'
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setTemperatureUnit: (state, action) => {
      state.units = action.payload;
    },
    clearSelectedCity: (state) => {
      state.selectedCity = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCity = action.payload[0] || null;
        state.searchResults = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data";
      })
      .addCase(fetchDefaultCitiesWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDefaultCitiesWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCity = action.payload[0] || null;
        state.searchResults = action.payload;
      })
      .addCase(fetchDefaultCitiesWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch default cities' weather data";
      });
  },
});

export const { setSelectedCity, setTemperatureUnit, clearSelectedCity } =
  weatherSlice.actions;
export default weatherSlice.reducer;
