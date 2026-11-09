// Import all dependencies
import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Components
import Error from "./Error";

// Function to render the ThemeProvider
const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={darkTheme}>{ui}</ThemeProvider>);
};

describe("Error Component", () => {
  // Test that it renders a String error message correctly
  it("Renders the error message for a string prop", () => {
    renderWithTheme(<Error error="Failed to load weather data" />);
    expect(
      screen.getByText(/⚠️ Failed to load weather data/i),
    ).toBeInTheDocument();
  });

  // Test that it renders an Object error message correctly and without an error prop
  it("Renders the error message for an object prop or a default message if its missing", () => {
    // Render with an object error prop to test object handling
    renderWithTheme(<Error error={{ message: "API Timeout" }} />);
    expect(
      screen.getByText(/⚠️ API Timeout/i),
    ).toBeInTheDocument();

    // Rerender without an error prop to test default message
    renderWithTheme(<Error />);
    expect(
      screen.getByText(/⚠️ An unexpected error occurred. Please try again./i),
    ).toBeInTheDocument();
  });

  // Test that it renders properly based on if onRetry prop is passed or not
  it("Renders a retry button depending on the presence of the onRetry prop", () => {
    // Render without onRetry prop to test absence of retry button
    renderWithTheme(<Error />);
    expect(
      screen.queryByRole("button", { name: /retry/i }),
    ).not.toBeInTheDocument();

    renderWithTheme(<Error onRetry={() => {}} />);
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  // Test that clicking the retry button triggers the onRetry callback
  it("Calls the onRetry callback when the retry button is clicked", () => {
    const onRetryMock = vi.fn();
    renderWithTheme(<Error onRetry={onRetryMock} />);
    const retryButton = screen.getByRole("button", { name: /try again/i });
    retryButton.click();
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});
