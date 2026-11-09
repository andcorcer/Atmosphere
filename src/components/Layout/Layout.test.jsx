// Import all dependencies
import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Components
import Layout from "./Layout";

// Dummy components to simulate navigation within the Layout component
const Home = () => <div data-testid="home-page">Home Page</div>;
const Details = () => <div data-testid="details-page">Details Page</div>;

// We create the routes to simulate navigation within the Layout component for testing purposes
const renderWithRouter = (route = "/") => {
  window.history.pushState({}, "Test page", route);
  return render(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/details" element={<Details />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    </ThemeProvider>,
  );
};

describe("Layout Component", () => {
  // Test to see that it renders the header correctly
  it("Renders the header correctly", () => {
    renderWithRouter("/");
    expect(screen.getByText(/Atmosphere/i)).toBeInTheDocument();
  });

  // Test to see that the Outlet renders the correct child component based on the route
  it("Renders the correct child component based on the route", () => {
    // Render the home route and check if the Home component is displayed
    renderWithRouter("/");
    expect(screen.getByTestId("home-page")).toBeInTheDocument();

    // Render the details route and check if the Details component is displayed
    renderWithRouter("/details");
    expect(screen.getByTestId("details-page")).toBeInTheDocument();
  });
});
