// Import all dependencies
import axios from "axios";

// Create an instance of axios with the base URL
const forecastApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle errors in the response
forecastApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Network errors
    if (!error.response) {
      console.error(`[forecast API Error]: Verify your internet connection.`);
      return Promise.reject(
        new Error(
          "Forecast API is unreachable. Check your internet connection or the API status.",
        ),
      );
    }

    // Handle HTTP errors returned by the API
    const status = error.response.status;
    const errorMessage =
      error.response.data?.reason ||
      error.response.data?.error ||
      "Unknown error";
    console.error(`[forecast API Error]: ${status} ${errorMessage}`);
    return Promise.reject(
      new Error(`Forecast API returned an error: ${status} ${errorMessage}`),
    );
  },
);

// JSDoc comment for the function that fetches the forecast for given coordinates
/**
 * Fetch the forecast for given latitude and longitude
 * @param {number} latitude - The latitude of the location to fetch the forecast for
 * @param {number} longitude - The longitude of the location to fetch the forecast for
 * @returns {Promise<{ times: string[], temperatures: number[], codes: number[], tempUnit: string }>} The times, temperatures, weather codes, and temperature unit of the specified location's forecast
 */

const fetchForecast = async (latitude, longitude) => {
  const response = await forecastApi.get(`/forecast`, {
    params: {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: "temperature_2m,weather_code",
      forecast_days: "1",
      temperature_unit: "celsius",
      timezone: "auto",
      format: "json",
    },
  });
  const times = response.data.hourly.time;
  const temperatures = response.data.hourly.temperature_2m;
  const codes = response.data.hourly.weather_code;
  const tempUnit = response.data.hourly_units.temperature_2m;
  const timezone = response.data.timezone;

  return {
    times,
    temperatures,
    codes,
    tempUnit,
    timezone,
  };
};

export default fetchForecast;
