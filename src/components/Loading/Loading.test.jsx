// Import all dependencies
import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Components
import Loading from "./Loading";

// Function to render the ThemeProvider
const renderWithTheme = () => {
  return render(<ThemeProvider theme={darkTheme}><Loading /></ThemeProvider>);
};

describe("Loading Component", () => {
  // Test that it renders a Loading message when the component is mounted
  it("Renders the loading message when the component is mounted", () => {
    renderWithTheme(<Loading />);
    expect(screen.getByText(/⏳ Loading.../i)).toBeInTheDocument();
  });
});
