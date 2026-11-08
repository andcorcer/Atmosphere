// Import all dependencies
import { useSelector } from "react-redux";

// Define the baseTheme object for the application
const baseTheme = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    baseFontSize: "100%", // 100% = 16px
  },

  transition: {
    speed: "0.3s ease",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
};

// Define the darkTheme object for the application
export const darkTheme = {
  ...baseTheme,

  colors: {
    background: "#0B132B",
    surface: "#1C2541",
    textPrimary: "#FFFFFF",
    textSecondary: "#98A6BB",
    accent: "#00B4D8",
    accentHover: "#90E0EF",
    border: "#2A3A5F",
    error: "#F87171",
    success: "#4ADE80",
  },

  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
    md: "0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
  },
};

// Define the lightTheme object for the application
export const lightTheme = {
  ...baseTheme,

  colors: {
    background: "#E3F2FD",
    surface: "#ffffff",
    textPrimary: "#0D47A1",
    textSecondary: "#546E7A",
    accent: "#1976D2",
    accentHover: "#1565C0",
    border: "#BBDEFB",
    error: "#EF4444",
    success: "#22C55E",
  },

  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
  },
};
