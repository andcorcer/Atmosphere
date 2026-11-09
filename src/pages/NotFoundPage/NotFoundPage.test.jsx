// Import all dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

// Import theme
import { darkTheme } from "../../styles/theme";

// Import Components
import NotFoundPage from "./NotFoundPage";

// Helper to render NotFoundPage with routing context
const renderNotFoundPage = (initialRoute = "/undefined/route") => {
  render(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
};

describe("NotFoundPage Component", () => {
  // Test to see if it renders the NotFoundPage correctly for undefined routes
  it("Renders the NotFoundPage correctly for undefined routes", () => {
    renderNotFoundPage("/some/undefined/route");
    expect(screen.getByText((content) => content.includes("Page Not Found"))).toBeInTheDocument();
  });

  // Test if the Back to Home button is rendered and works correctly
  it("Renders the Back to Home button and navigates correctly", () => {
    renderNotFoundPage("/some/undefined/route");
    const backButton = screen.getByRole("link", { name: /Back to Home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });
});
