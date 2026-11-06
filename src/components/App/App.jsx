import { useState, useEffect } from 'react'
import { fetchWeatherData } from '../../store/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import fetchCityCoordinates from '../../utilities/geocodingApi';

function App() {
  const dispatch = useDispatch()
  const searchResults = useSelector((state) => state.weather.searchResults)

  useEffect(() => {
    fetchCityCoordinates('New', 5).then((coordinates) => {
      console.log('Coordinates for New:', coordinates);
    });
    dispatch(fetchWeatherData({ cityName: 'New', count: 5 }));
  }, [dispatch]);

  return (
    <>
    <div>
      {searchResults.map((city) => (
        <div key={city.name}>
          <h3>{city.name}</h3>
          <p>Latitude: {city.latitude}</p>
          <p>Longitude: {city.longitude}</p>
          <p>Temperature: {city.temperatures[0]} {city.tempUnit}</p>
          <p>Weather Code: {city.codes[0]}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
