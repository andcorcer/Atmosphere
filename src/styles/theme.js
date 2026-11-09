// Define the baseTheme object for the application
const baseTheme = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    baseFontSize: "100%", // 100% = 16px
    mainHeadingFontSize: "2.5rem", 
    subHeadingFontSize: "1.5rem", 
    bodyFontSize: "0.85rem", 
    fontWeight: "400",
    headingFontWeight: "700",
    buttonFontWeight: "600",
  },

  border: {
    radius: "0.5rem",
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
    surfaceHover: "#2C3A5D",
    textPrimary: "#FFFFFF",
    textSecondary: "#98A6BB",
    accent: "#00B4D8",
    accentHover: "#0e8198",
    border: "#475d8f",
    highlight: "#FFDF00",
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
    background: "#badbf4",
    surface: "#c4e4dd",
    surfaceHover: "#f0f0f0",
    textPrimary: "#1e3e6d",
    textSecondary: "#546E7A",
    accent: "#358fe8",
    accentHover: "#1565C0",
    border: "#7ba1c1",
    highlight: "#e3c606",
    error: "#EF4444",
    success: "#22C55E",
  },

  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
  },
};
