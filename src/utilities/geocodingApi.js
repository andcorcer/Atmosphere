// Import all dependencies
import axios from "axios";

// Create an instance of axios with the base URL
const geocodingApi = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle errors in the response
geocodingApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Network errors
    if (!error.response) {
      console.error(`[geocoding API Error]: Verify your internet connection.`);
      return Promise.reject(
        new Error(
          "Geocoding API is unreachable. Check your internet connection or the API status.",
        ),
      );
    }

    // Handle HTTP errors returned by the API
    const status = error.response.status;
    const errorMessage =
      error.response.data?.reason ||
      error.response.data?.error ||
      "Unknown error";
    console.error(`[geocoding API Error]: ${status} ${errorMessage}`);
    return Promise.reject(
      new Error(`Geocoding API returned an error: ${status} ${errorMessage}`),
    );
  },
);

// JSDoc comment for the function that fetches a cities latitude and longitude
/**
 * Fetch the latitude and longitude for a given city name
 * @param {string} cityName - The name of the city to fetch coordinates for
 * @param {number} count - The number of results to fetch for the city
 * @returns {Promise<{ latitude: number, longitude: number, name: string }>} The latitude, longitude, and name of the specified city
 */

const fetchCityCoordinates = async (cityName, count = 1) => {
  const response = await geocodingApi.get(`/search`, {
    params: {
      name: cityName,
      count: count.toString(),
      format: "json",
    },
  });
  const cities = response.data?.results;

  if (!cities || cities.length === 0) {
    throw new Error(`No coordinates found for city: ${cityName}`);
  }

  // Manually cap the number of cities to the requested count
  const cappedCities = cities.slice(0, count);

  // cappedCities.forEach((city) => {
  //   console.log(
  //     `City: ${city.name}, Latitude: ${city.latitude}, Longitude: ${city.longitude}`,
  //   );
  // });

  return cappedCities.map((city) => ({ latitude: city.latitude, longitude: city.longitude, name: city.name }));
};

export default fetchCityCoordinates;
