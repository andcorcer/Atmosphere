// Import all dependencies
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Components
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import CitiesContainer from "../../components/CitiesContainer/CitiesContainer";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

// Import Actions
import { fetchWeatherData } from "../../store/weatherSlice";

// Import Styles

const DetailsPage = () => {
  // Extract the city parameter from the URL and initialize the Redux dispatch function
  const { city } = useParams();
  const dispatch = useDispatch();

  // Get the selected city to display its details, the search results to display the rest of the cities, the current status and error from the Redux store
  const {selectedCity, searchResults, status, error} = useSelector((state) => state.weather);

  // Fetch weather data for the specified city when the component mounts or the city changes
  useEffect(() => {
    if (city) {
      const formattedCity = decodeURIComponent(city);
      dispatch(fetchWeatherData({cityName: formattedCity, count: 10 }));
    }
  }, [city, dispatch]);

  // Load Loading component if the status is 'loading'
  if (status === "loading") {
    return <Loading />;
  }

  // Load Error component if there is an error
  if (status === "failed") {
    return <Error error={error} />;
  }

  return (
    <div>
      <DetailsCard city={selectedCity} />
      {searchResults && searchResults.length > 0 && (
        <CitiesContainer cities={searchResults} />
      )}
    </div>
  );
};

export default DetailsPage;
