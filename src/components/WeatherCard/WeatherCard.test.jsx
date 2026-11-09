// Import all dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Reducers
import weatherReducer from "../../store/weatherSlice";
import watchlistReducer from "../../store/watchlistSlice";

// Import Components
import WeatherCard from "./WeatherCard";

// Mock city data for testing hourly arrays
const mockCity = {
  name: "New York",
  latitude: 40.7128,
  longitude: -74.006,
  timezone: "America/New_York",
  times: ["2026-11-09T10:00", "2026-11-09T11:00"],
  temperatures: [15, 17],
  codes: [0, 2],
};

const renderWeatherCard = (
  city = mockCity,
  initialUnits = "celsius",
  initialWatchlist = [],
) => {
  const mockStore = configureStore({
    reducer: {
      weather: weatherReducer,
      watchlist: watchlistReducer,
    },
    preloadedState: {
      watchlist: { items: initialWatchlist },
      weather: { selectedCity: null, units: initialUnits },
    },
  });

  // Spy on dispatch to verify action triggers
  const dispatchSpy = vi.spyOn(mockStore, "dispatch");

  // We render the WeatherCard component wrapped with the Redux provider, theme provider, and memory router to simulate the full application context for testing purposes.
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
        <WeatherCard city={city} />
      </ThemeProvider>
    </Provider>,
  );
  return dispatchSpy;
};

describe("WeatherCard Component", () => {
  // Renders the city name and the toggle watchlist button
  it("Renders the city provided in the city prop correctly", () => {
    renderWeatherCard(mockCity);

    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Toggle watchlist/i)).toBeInTheDocument();
  });

  // Test the current time's weather and temperature are displayed and other times are not
  it("Only displays the current time's weather and temperature", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-09T10:00"));

    renderWeatherCard(mockCity, "celsius");

    // Get the data corresponding to the mocked current system time but transformed to the mocked city's timezone
    expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("17") && content.includes("°C"))).toBeInTheDocument();

    // Weather data not from the current time should not be displayed
    expect(screen.queryByText(/clear sky/i)).not.toBeInTheDocument();
    expect(screen.queryByText((content) => content.includes("15") && content.includes("°C"))).not.toBeInTheDocument();
  });

  // Renders the temperature in Fahrenheit correctly when the units state is set to "fahrenheit"
  it("Renders the temperature in Fahrenheit correctly", () => {
    renderWeatherCard(mockCity, "fahrenheit");

    expect(
      screen.getByText(
        (content) => content.includes("62.6") && content.includes("°F"),
      ),
    ).toBeInTheDocument();
  });

  // It dispatches addCity action correctly when the toggle watchlist button is clicked
  it("Dispatches addCity action correctly", () => {
    const dispatchSpy = renderWeatherCard(mockCity, "celsius", []);

    const toggleButton = screen.getByLabelText(/Toggle watchlist/i);
    fireEvent.click(toggleButton);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "watchlist/addCity",
      payload: mockCity,
    });
  });

  // It dispatches removeCity action correctly when the toggle watchlist button is clicked
  it("Dispatches removeCity action correctly", () => {
    const dispatchSpy = renderWeatherCard(mockCity, "celsius", [mockCity]);

    const toggleButton = screen.getByLabelText(/Toggle watchlist/i);
    fireEvent.click(toggleButton);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "watchlist/removeCity",
      payload: mockCity.name,
    });
  });

  // Dispatches setSelectedCity action correctly when clicking anywhere in the WeatherCard component
  it("Dispatches setSelectedCity action correctly", () => {
    const dispatchSpy = renderWeatherCard(mockCity, "celsius", []);

    const weatherCard = screen.getByLabelText(/select city/i);
    fireEvent.click(weatherCard);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "weather/setSelectedCity",
      payload: mockCity,
    });
  });
});
