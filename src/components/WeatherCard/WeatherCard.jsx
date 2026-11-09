// Import all dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sun,
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Thermometer,
  Star,
} from "lucide-react";

// Import component-specific utilities and helpers
import { convertTemperature } from "../../utilities/temperatures";

// Import Actions
import { setSelectedCity } from "../../store/weatherSlice";
import { addCity, removeCity } from "../../store/watchlistSlice";

// Import Styles
import {
  WeatherCardContainer,
  HeaderContainer,
  WeatherCardTitle,
  StarContainer,
  IconContainer,
  MetadataContainer,
  WeatherCodeContainer,
  TemperatureContainer,
  MetadataText,
} from "./WeatherCard.styles";

// Function to get human-readable weather description from code
const getWeatherDescription = (code) => {
  if (code === 0 || code === 1) {
    return ["Clear sky", <Sun />];
  } else if (code === 2 || code === 3) {
    return ["Partly cloudy", <Cloud />];
  } else if (code >= 45 && code <= 48) {
    return ["Fog", <CloudFog />];
  } else if (
    (code >= 51 && code <= 55) ||
    (code >= 61 && code <= 65) ||
    (code >= 80 && code <= 82)
  ) {
    return ["Rain and Drizzle", <CloudRain />];
  } else if (
    (code >= 56 && code <= 57) ||
    (code >= 66 && code <= 67) ||
    (code >= 71 && code <= 77) ||
    (code >= 85 && code <= 86)
  ) {
    return ["Snow and Freezing Rain", <CloudSnow />];
  } else if (code >= 95 && code <= 99) {
    return ["Thunderstorm", <CloudLightning />];
  }

  return ["Unknown weather", null];
};

// WeatherCard Component
const WeatherCard = ({ city }) => {
  const dispatch = useDispatch();

  // Deestructure the received city object to extract relevant details
  const { name, times = [], temperatures = [], codes = [] } = city || {};

  // Weather unit from the Redux store (celsius or fahrenheit)
  const tempUnit = useSelector((state) => state.weather.units);

  // We get all cities in the watchlist from the Redux store
  const watchlist = useSelector((state) => state.watchlist.items);

  // Determine the current time and find its index in the times array to highlight the current hour in the UI

  // Determine the timezone to correctly calculate the current time (fall back to the local timezone if not provided by the city object)
  const timezone =
    city?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Formatter to get the current time in the city's timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  });

  // We get all the individual parts of the current date and time in the city's timezone
  const parts = formatter.formatToParts(new Date());
  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  const currentTime = `${getPart("year")}-${getPart("month")}-${getPart("day")}T${getPart("hour")}:00`;
  const currentIndex =
    times.indexOf(currentTime) !== -1 ? times.indexOf(currentTime) : 0;

  const [description, icon] =
    getWeatherDescription(codes?.[currentIndex]) || [];

  // Handlers
  const handleToggleWatchlist = () => {
    if (watchlist.some((item) => item.name === name)) {
      dispatch(removeCity(name));
    } else {
      const { tempUnit: _, ...cityWithoutTempUnit } = city;
      dispatch(addCity(cityWithoutTempUnit));
    }
  };

  const handleSelectCity = () => {
    dispatch(setSelectedCity(city));
  };

  return (
    <WeatherCardContainer onClick={handleSelectCity} aria-label="Select city">
      <HeaderContainer>
        <WeatherCardTitle>{name}</WeatherCardTitle>
        <StarContainer
          aria-label="Toggle watchlist"
          $active={watchlist.some((item) => item.name === name)}
          onClick={handleToggleWatchlist}
        >
          <Star />
        </StarContainer>
      </HeaderContainer>
      <MetadataContainer>
        <WeatherCodeContainer>
          <IconContainer>{icon}</IconContainer>
          <MetadataText>{description}</MetadataText>
        </WeatherCodeContainer>
        <TemperatureContainer>
          <IconContainer>
            <Thermometer />
          </IconContainer>
          <MetadataText>
            {`Temperature: ${convertTemperature(temperatures?.[currentIndex], tempUnit)} ${tempUnit === "celsius" ? "°C" : "°F"}`}
          </MetadataText>
        </TemperatureContainer>
      </MetadataContainer>
    </WeatherCardContainer>
  );
};

// Export the WeatherCard Component
export default WeatherCard;
