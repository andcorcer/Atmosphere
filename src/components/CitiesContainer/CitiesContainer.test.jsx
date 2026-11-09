// Import all dependencies
import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Reducers
import weatherReducer from "../../store/weatherSlice";
import watchlistReducer from "../../store/watchlistSlice";

// Import Components
import CitiesContainer from "./CitiesContainer";

const renderCitiesContainer = (cities = []) => {
  const mockStore = configureStore({
    reducer: {
      weather: weatherReducer,
      watchlist: watchlistReducer,
    },
    preloadedState: {
      watchlist: { items: [] },
      weather: { selectedCity: null },
    },
  });

  // Spy on dispatch to verify action triggers
  const dispatchSpy = vi.spyOn(mockStore, "dispatch");

  // We render the Header component wrapped with the Redux provider, theme provider, and memory router to simulate the full application context for testing purposes.
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
          <CitiesContainer cities={cities} />
      </ThemeProvider>
    </Provider>,
  );
  return dispatchSpy;
};

describe("CitiesContainer Component", () => {
  // Renders all cities provided in the cities prop correctly
  it("Renders all cities provided in the cities prop correctly", () => {
    renderCitiesContainer([
      { name: "New York" },
      { name: "Los Angeles" },
      { name: "Chicago" },
    ]);

    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument();
    expect(screen.getByText(/Chicago/i)).toBeInTheDocument();
  });

  // Renders the empty state message when no cities are provided
  it("Renders the empty state message when no cities are provided", () => {
    renderCitiesContainer();

    expect(screen.getByText(/No cities available/i)).toBeInTheDocument();
  });
});
