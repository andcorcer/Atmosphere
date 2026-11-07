// Import all dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Components
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import CitiesContainer from "../../components/CitiesContainer/CitiesContainer";
import Search from "../../components/Search/Search";
import UnitToggle from "../../components/UnitToggle/UnitToggle";

// Import Actions
import {
  setSelectedCity,
  fetchDefaultCitiesWeather,
  clearSelectedCity,
} from "../../store/weatherSlice";

// Import Styles
import { HomePageContainer, SearchContainer } from "./HomePage.styles";

// List of default cities to display when the watchlist is empty
const initialDefaultCities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Mexico City",
];

const HomePage = () => {
  const dispatch = useDispatch();

  // Get the list of cities from the Redux store's watchlist state
  const citiesWatchlist = useSelector((state) => state.watchlist.items);

  // Get the list of default cities' from the Redux store
  const defaultCities = useSelector((state) => state.weather.searchResults);

  // Get the selected city from the Redux store's weather state
  const selectedCity = useSelector((state) => state.weather.selectedCity);

  // Fetch default cities' weather data when the component mounts
  useEffect(() => {
    dispatch(
      fetchDefaultCitiesWeather({ defaultCities: initialDefaultCities }),
    );
    dispatch(clearSelectedCity());
  }, [dispatch]);

  // Effect to set the selected city based on the watchlist or default cities
  useEffect(() => {
    if (citiesWatchlist.length > 0) {
      const selectedInWatchlist = citiesWatchlist.some(
        (city) => city.name === selectedCity?.name,
      );
      if (!selectedInWatchlist || !selectedCity)
        dispatch(setSelectedCity(citiesWatchlist[0]));
    } else if (defaultCities.length > 0 && !selectedCity) {
      dispatch(setSelectedCity(defaultCities[0]));
    }
  }, [citiesWatchlist, defaultCities, selectedCity, dispatch]);

  return (
    <HomePageContainer>
      <SearchContainer>
        <Search />
        <UnitToggle />
      </SearchContainer>
      <DetailsCard city={selectedCity} />
      {citiesWatchlist.length > 0 ? (
        <CitiesContainer cities={citiesWatchlist} />
      ) : (
        <CitiesContainer cities={defaultCities} />
      )}
    </HomePageContainer>
  );
};

export default HomePage;
