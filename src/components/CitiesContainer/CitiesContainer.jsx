// Import all dependencies
import React from "react";

// Import Components
import WeatherCard from "../WeatherCard/WeatherCard";

// Import Styles
import {
  CitiesContainerWrapper,
  NoCitiesMessage,
} from "./CitiesContainer.styles";

// CitiesContainer Component
const CitiesContainer = ({ cities }) => {
  return (
    <CitiesContainerWrapper>
      {cities && cities.length > 0 ? (
        cities.map((city, index) => <WeatherCard key={index} city={city} />)
      ) : (
        <NoCitiesMessage>No cities available</NoCitiesMessage>
      )}
    </CitiesContainerWrapper>
  );
};

// Export the CitiesContainer Component
export default CitiesContainer;
