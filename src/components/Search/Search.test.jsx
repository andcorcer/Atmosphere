// Import all dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Components
import Search from "./Search";

// Dummy components to simulate navigation within the Layout component
const Details = () => <div data-testid="details-page">Details Page</div>;

const renderWithRouter = () =>
  render(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/city/:cityName" element={<Details />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("Search Component", () => {
  // Test to see if the search input is rendered correctly and search button is present as disabled initially
  it("Renders the search input and button correctly", () => {
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search for a city.../i);
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeDisabled();
  });

  // The button is enabled when the input isn't empty and when clicked it navigates to the search results page
  it("Next, the search button is enabled when the input isn't empty", () => {
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search for a city.../i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "New York" } });
    expect(searchButton).toBeEnabled();

    fireEvent.click(searchButton);
    expect(screen.getByTestId("details-page")).toBeInTheDocument();
  });
});
