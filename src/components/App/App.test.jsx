// Import all dependencies
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Reducers
import weatherReducer from "../../store/weatherSlice";
import watchlistReducer from "../../store/watchlistSlice";
import themeReducer from "../../store/themeSlice";

// Import Routes
import { AppRoutes } from "./App";

// We mock the weatherSlice to control so that the async thunks don't get executed during tests and we can provide predictable state for our components.
vi.mock("../../store/weatherSlice", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchDefaultCitiesWeather: () => ({ type: "weather/fetchDefaultCitiesWeather/fulfilled", payload: [] }),
    clearSelectedCity: () => ({ type: "weather/clearSelectedCity" }),
  };
});

// Helper to render App with dynamic mock store & routing context
const renderAppRoutes = (initialRoute = "/") => {
  const mockStore = configureStore({
    reducer: {
      theme: themeReducer,
      weather: weatherReducer,
      watchlist: watchlistReducer,
    },
    preloadedState: {
      theme: { theme: "dark" },
      weather: {
        selectedCity: { name: "New York", latitude: 40.71, longitude: -74.00, times: [], temperatures: [], codes: [] },
        searchResults: [{ name: "New York", latitude: 40.71, longitude: -74.00, times: [], temperatures: [], codes: [] }],
        status: "succeeded", 
        error: null,
        units: "celsius",
      },
      watchlist: { items: [] },
    },
  });

  // We render the App component wrapped with the Redux provider, theme provider, and memory router to simulate the full application context for testing purposes.
  return render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe("App Routes", () => {
  // Test to see if it renders the HomePage when on root route "/"
  it("Renders the HomePage correctly on root route", () => {
    renderAppRoutes("/");
    expect(screen.getByPlaceholderText(/Search for a city.../i)).toBeInTheDocument();
  });

  // Test to see if it renders the DetailsPage when on a city route
  it("Renders the DetailsPage correctly on city route", () => {
    renderAppRoutes("/city/London");
    expect(
      screen.queryByRole("button", { name: /Search/i }),
    ).not.toBeInTheDocument();
  });

  // Test to see if it renders the NotFoundPage when on an unknown route
  it("Renders the NotFoundPage correctly on unknown route", () => {
    renderAppRoutes("/unknown");
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
