// Import all dependencies
import React from "react";

// Import Components
import WeatherCard from "../WeatherCard/WeatherCard";

// Import Styles
import { CitiesContainerWrapper } from "./CitiesContainer.styles";

// CitiesContainer Component
const CitiesContainer = ({ cities }) => {
  return (
    <CitiesContainerWrapper>
      {cities.map((city, index) => (
        <WeatherCard key={index} city={city} />
      ))}
    </CitiesContainerWrapper>
  );
};

// Export the CitiesContainer Component
export default CitiesContainer;
