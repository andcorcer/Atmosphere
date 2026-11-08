// Define global styles for the application using styled-components
// Import all Dependencies
import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={(theme) => css`
      html {
        font-size: ${theme.typography.baseFontSize};
      }
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        background-color: ${theme.colors.background};
        color: ${theme.colors.textPrimary};
        font-family: ${theme.typography.fontFamily};
        font-size: ${theme.typography.baseFontSize};
        min-height: 100vh;
      }
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.accent};
        border-radius: 3px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.accentHover};
      }
    `}
  />
);
