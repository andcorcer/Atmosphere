// Import all dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Actions
import { setTemperatureUnit } from "../../store/weatherSlice";

// Import Styles
import { UnitToggleContainer, UnitToggleButton } from "./UnitToggle.styles";

// UnitToggle Component
const UnitToggle = () => {
  const dispatch = useDispatch();

  // Weather unit from the Redux store (celsius or fahrenheit)
  const tempUnit = useSelector((state) => state.weather.units);

  // Funtion to handle temperature unit change
  const handleUnitChange = (unit) => {
    if (unit !== tempUnit) {
      dispatch(setTemperatureUnit(unit));
    }
  };

  return (
    <UnitToggleContainer>
      <UnitToggleButton onClick={() => handleUnitChange("celsius")}>°C</UnitToggleButton>
      <UnitToggleButton onClick={() => handleUnitChange("fahrenheit")}>°F</UnitToggleButton>
    </UnitToggleContainer>
  );
};

// Export the UnitToggle Component
export default UnitToggle;
