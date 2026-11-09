// Import all dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Reducers
import weatherReducer from "../../store/weatherSlice";
import watchlistReducer from "../../store/watchlistSlice";

// Import Components
import DetailsPage from "./DetailsPage";

// We mock the weatherSlice to control its behavior so that the async thunks don't get executed during tests and we can provide predictable state for our components.
vi.mock("../../store/weatherSlice", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchWeatherData: () => ({ type: "weather/dummy" }), // Dummy action to prevent actual API call during tests
    clearSelectedCity: () => ({ type: "weather/clearSelectedCity" }),
  };
});

// Helper to render DetailsPage with dynamic mock store & routing context
const renderDetailsPage = (
  weatherState = {
    selectedCity: null,
    searchResults: [],
    status: "idle",
    error: null,
  },
  initialRoute = "/city/London"
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

  // We render the DetailsPage component wrapped with the Redux provider, theme provider, and memory router to simulate the full application context for testing purposes.
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/city/:cityName" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
  return dispatchSpy;
};

describe("DetailsPage Component", () => {
  // Test to see if it dispatches the correct action on mount or whenever the cityName parameter in the url changes (fetchWeatherData)
  it("Fetches weather data whenever the cityName parameter in the URL changes", () => {
    const dispatchSpy = renderDetailsPage({
      selectedCity: null,
      searchResults: [],
      status: "succeeded",
      error: null,
    });

    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: "weather/dummy",
    }));
  });

  // Test to see if it renders the loading state correctly when status is "loading"
  it("Renders loading state correctly", () => {
    renderDetailsPage({
      selectedCity: null,
      searchResults: [],
      status: "loading",
      error: null,
    });
    expect(screen.getByText((content => content.includes("Loading...")))).toBeInTheDocument();
  });

  // Test error state rendering with onRetry button
  it("Renders error state correctly", () => {
    const dispatchSpy = renderDetailsPage({
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
