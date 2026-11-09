// Import all dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Reducers
import weatherReducer from "../../store/weatherSlice";

// Import Components
import UnitToggle from "./UnitToggle";

// Helper to render UnitToggle with dynamic mock store
const renderUnitToggle = (initialThemeState = "celsius") => {
  const mockStore = configureStore({
    reducer: {
      weather: weatherReducer,
    },
    preloadedState: {
      weather: { units: initialThemeState },
    },
  });

  // Spy on dispatch to verify action triggers
  const dispatchSpy = vi.spyOn(mockStore, "dispatch");

  // We render the UnitToggle component wrapped with the Redux provider and theme provider to simulate the full application context for testing purposes.
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
        <UnitToggle />
      </ThemeProvider>
    </Provider>,
  );
  return dispatchSpy;
};

describe("UnitToggle Component", () => {
  // Test to see if the unit toggle renders correctly with initial state
  it("Renders the unit toggle correctly with initial state", () => {
    renderUnitToggle();

    const celsiusButton = screen.getByRole("button", { name: /°C/i });
    expect(celsiusButton).toBeInTheDocument();

    const fahrenheitButton = screen.getByRole("button", { name: /°F/i });
    expect(fahrenheitButton).toBeInTheDocument();
  });

  // The button is active when the corresponding unit is selected
  it("The button is active when the corresponding unit is selected", () => {
    renderUnitToggle("celsius");

    const celsiusButton = screen.getByRole("button", { name: /°C/i });
    const fahrenheitButton = screen.getByRole("button", { name: /°F/i });
    const celsiusButtonBg = window.getComputedStyle(celsiusButton).backgroundColor;
    expect(celsiusButtonBg).toBe(darkTheme.colors.accent);
    const fahrenheitButtonBg = window.getComputedStyle(fahrenheitButton).backgroundColor;
    expect(fahrenheitButtonBg).toBe("transparent");

    fireEvent.click(fahrenheitButton);
    const fahrenheitButtonBgAfterClick = window.getComputedStyle(fahrenheitButton).backgroundColor;
    expect(fahrenheitButtonBgAfterClick).toBe(darkTheme.colors.accent);
    const celsiusButtonBgAfterClick = window.getComputedStyle(celsiusButton).backgroundColor;
    expect(celsiusButtonBgAfterClick).toBe("transparent");
  });
});
