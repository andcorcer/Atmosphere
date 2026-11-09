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
import DetailsCard from "./DetailsCard";

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

const renderDetailsCard = (
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

  // We render the DetailsCard component wrapped with the Redux provider, theme provider, and memory router to simulate the full application context for testing purposes.
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
        <DetailsCard city={city} />
      </ThemeProvider>
    </Provider>,
  );
  return dispatchSpy;
};

describe("DetailsCard Component", () => {
  // Renders the city name, the toggle watchlist button, and the cities' coordinates correctly
  it("Renders the city provided in the city prop correctly", () => {
    renderDetailsCard(mockCity);

    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Toggle watchlist/i)).toBeInTheDocument();
    expect(screen.getByText(/Latitude: 40.71/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitude: -74.01/i)).toBeInTheDocument();
  });

  // Renders the hourly weather information correctly, including time, weather description, and temperature with the formatted unit
  it("Renders the hourly weather information correctly", () => {
    renderDetailsCard(mockCity, "celsius");

    expect(screen.getByText(/time: 10:00/i)).toBeInTheDocument();
    expect(screen.getByText(/time: 11:00/i)).toBeInTheDocument();

    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) => content.includes("15") && content.includes("°C"),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) => content.includes("17") && content.includes("°C"),
      ),
    ).toBeInTheDocument();
  });

  // Test the current time has an active prop and its corresponding styling
  it("Highlights the current time correctly", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-09T10:00"));

    renderDetailsCard(mockCity, "celsius");

    const currentTimeElement = screen.getByText(/time: 11:00/i); // Insert the time corresponding to the mocked current system time but transformed to the mocked city's timezone
    const currentTimeElementColor = window.getComputedStyle(currentTimeElement).color;
    expect(currentTimeElementColor).toBe(darkTheme.colors.highlight); 
  });

  // Renders the temperature in Fahrenheit correctly when the units state is set to "fahrenheit"
  it("Renders the temperature in Fahrenheit correctly", () => {
    renderDetailsCard(mockCity, "fahrenheit");

    expect(
      screen.getByText(
        (content) => content.includes("59") && content.includes("°F"),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) => content.includes("62.6") && content.includes("°F"),
      ),
    ).toBeInTheDocument();
  });

  // It dispatches addCity action correctly when the toggle watchlist button is clicked
  it("Dispatches addCity action correctly", () => {
    const dispatchSpy = renderDetailsCard(mockCity, "celsius", []);

    const toggleButton = screen.getByLabelText(/Toggle watchlist/i);
    fireEvent.click(toggleButton);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "watchlist/addCity",
      payload: mockCity,
    });
  });

  // It dispatches removeCity action correctly when the toggle watchlist button is clicked
  it("Dispatches removeCity action correctly", () => {
    const dispatchSpy = renderDetailsCard(mockCity, "celsius", [mockCity]);

    const toggleButton = screen.getByLabelText(/Toggle watchlist/i);
    fireEvent.click(toggleButton);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "watchlist/removeCity",
      payload: mockCity.name,
    });
  });

  // Dispatches setSelectedCity action correctly when clicking anywhere in the DetailsCard component
  it("Dispatches setSelectedCity action correctly", () => {
    const dispatchSpy = renderDetailsCard(mockCity, "celsius", []);

    const detailsCard = screen.getByLabelText(/select city/i);
    fireEvent.click(detailsCard);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "weather/setSelectedCity",
      payload: mockCity,
    });
  });
});
