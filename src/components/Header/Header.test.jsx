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
import themeReducer from "../../store/themeSlice";

// Import Components
import Header from "./Header";

// Helper to render Header with dynamic mock store & routing context
const renderHeader = (initialThemeState = "dark") => {
  const mockStore = configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: { theme: initialThemeState },
    },
  });

  // Spy on dispatch to verify action triggers
  const dispatchSpy = vi.spyOn(mockStore, "dispatch");

  // We render the Header component wrapped with the Redux provider, theme provider, and memory router to simulate the full application context for testing purposes.
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
  return dispatchSpy;
};

describe("Header Component", () => {
  // Test to see if the header title is rendered correctly
  it("Renders the header title correctly", () => {
    renderHeader();
    expect(screen.getByText(/Atmosphere/i)).toBeInTheDocument();
  });

  // Test that when clicking the header title and it navigates to the home page
  it("Navigates to the home page when the header title is clicked", () => {
    renderHeader();
    const headerTitle = screen.getByText(/Atmosphere/i);
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveAttribute("href", "/");
  });

  // Test that the theme buttons are rendered correctly, the correct action is dispatched when clicked and they reflect the active theme state
  it("Renders the theme buttons correctly and dispatches the correct actions when clicked and reflects the active theme state", () => {
    const dispatchSpy = renderHeader("dark");

    const lightButton = screen.getByRole("button", { name: /light theme/i });
    expect(lightButton).toBeInTheDocument();
    const darkButton = screen.getByRole("button", { name: /dark theme/i });
    expect(darkButton).toBeInTheDocument();
    const darkButtonBg = window.getComputedStyle(darkButton).backgroundColor;
    expect(darkButtonBg).toBe(darkTheme.colors.accent); 
    const lightButtonBg = window.getComputedStyle(lightButton).backgroundColor;
    expect(lightButtonBg).toBe("transparent");

    fireEvent.click(lightButton);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "theme/setTheme",
      payload: "light",
    });
    const lightButtonBgAfterClick = window.getComputedStyle(lightButton).backgroundColor;
    expect(lightButtonBgAfterClick).toBe(darkTheme.colors.accent);
    const darkButtonBgAfterClick = window.getComputedStyle(darkButton).backgroundColor;
    expect(darkButtonBgAfterClick).toBe("transparent");

    fireEvent.click(darkButton);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "theme/setTheme",
      payload: "dark",
    });
    const darkButtonBgAfterClick2 = window.getComputedStyle(darkButton).backgroundColor;
    expect(darkButtonBgAfterClick2).toBe(darkTheme.colors.accent);
    const lightButtonBgAfterClick2 = window.getComputedStyle(lightButton).backgroundColor;
    expect(lightButtonBgAfterClick2).toBe("transparent");
  });
});
