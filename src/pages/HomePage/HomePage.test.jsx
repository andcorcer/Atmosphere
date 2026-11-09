// Import all dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Reducers
import weatherReducer from "../../store/weatherSlice";
import watchlistReducer from "../../store/watchlistSlice";

// Import Components
import HomePage from "./HomePage";

// We mock the weatherSlice to control so that the async thunks don't get executed during tests and we can provide predictable state for our components.
vi.mock("../../store/weatherSlice", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchDefaultCitiesWeather: () => ({ type: "weather/dummy" }), // Dummy action to prevent actual API call during tests
    clearSelectedCity: () => ({ type: "weather/clearSelectedCity" }),
  };
});

// Helper to render HomePage with dynamic mock store & routing context
const renderHomePage = (
  weatherState = {
    selectedCity: null,
    searchResults: [],
    status: "idle",
    error: null,
  },
) => {
  const mockStore = configureStore({
    reducer: {
      weather: weatherReducer,
      watchlist: watchlistReducer,
    },
    preloadedState: {
      weather: weatherState,
      watchlist: {
        items: [],
      },
    },
  });

  // Spy on dispatch to verify action triggers
  const dispatchSpy = vi.spyOn(mockStore, "dispatch");

  // We render the HomePage component wrapped with the Redux provider, theme provider, and memory router to simulate the full application context for testing purposes.
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
  return dispatchSpy;
};

describe("HomePage Component", () => {
  // Test to see if it dispatches the correct actions on mount (fetchDefaultCitiesWeather and clearSelectedCity)
  it("Dispatches the correct actions on mount", () => {
    const dispatchSpy = renderHomePage({
      selectedCity: null,
      searchResults: [],
      status: "succeeded",
      error: null,
    });

    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: "weather/dummy",
    }));
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: "weather/clearSelectedCity",
    }));
  });

  // Test to see if it renders the loading state correctly when status is "loading"
  it("Renders loading state correctly", () => {
    renderHomePage({
      selectedCity: null,
      searchResults: [],
      status: "loading",
      error: null,
    });
    expect(screen.getByText((content => content.includes("Loading...")))).toBeInTheDocument();
  });

  // Test error state rendering with onRetry button
  it("Renders error state correctly", () => {
    const dispatchSpy = renderHomePage({
      selectedCity: null,
      searchResults: [],
      status: "failed",
      error: "Failed to fetch weather data",
    });

    expect(
      screen.getByText((content) => content.includes("Failed to fetch weather data")),
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /Try Again/i });
    fireEvent.click(retryButton);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "weather/dummy",
    });
  });
});
