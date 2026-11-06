// Import all dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Import component-specific utilities and helpers
import { convertTemperature } from "../../utilities/temperatures";

// Import Actions
import { setTemperatureUnit } from "../../store/weatherSlice";

// Import Styles

// Function to get human-readable weather description from code
const getWeatherDescription = (code) => {
  if (code === 0 || code === 1) {
    return "Clear sky";
  } else if (code === 2 || code === 3) {
    return "Partly cloudy";
  } else if (code >= 45 && code <= 48) {
    return "Fog";
  } else if (
    (code >= 51 && code <= 55) ||
    (code >= 61 && code <= 65) ||
    (code >= 80 && code <= 82)
  ) {
    return "Rain and Drizzle";
  } else if (
    (code >= 56 && code <= 57) ||
    (code >= 66 && code <= 67) ||
    (code >= 71 && code <= 77) ||
    (code >= 85 && code <= 86)
  ) {
    return "Snow and Freezing Rain";
  } else if (code >= 95 && code <= 99) {
    return "Thunderstorm";
  }

  return "Unknown weather";
};

// DetailsCard Component
const DetailsCard = ({ city }) => {
  const dispatch = useDispatch();
  // Deestructure the received city object to extract relevant details
  const { name, latitude, longitude, times = [], temperatures = [], codes = [] } =
    city || {};
  const tempUnit = useSelector((state) => state.weather.units);

  // Funtion to handle temperature unit change
  const handleUnitChange = (unit) => {
    if (unit !== tempUnit) {
      dispatch(setTemperatureUnit(unit));
    }
  };

  return (
    <div>
      <h2>{name}</h2>
      <div>
        <p>Latitude: {latitude?.toFixed(2)}</p>
        <p>Longitude: {longitude?.toFixed(2)}</p>
        <button onClick={() => handleUnitChange('celsius')}>°C</button>
        <button onClick={() => handleUnitChange('fahrenheit')}>°F</button>
      </div>
      <div>
        {times.map((time, index) => (
          <div key={index}>
            <p>Time: {time}</p>
            <p>Weather: {getWeatherDescription(codes?.[index])}</p>
            <p>Temperature: {convertTemperature(temperatures?.[index], tempUnit)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the DetailsCard Component
export default DetailsCard;
