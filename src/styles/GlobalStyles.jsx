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
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-left: 1px solid ${theme.colors.border};
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.accent};
        border-radius: 6px;
        border: 2px solid transparent;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.accentHover};
      }
    `}
  />
);
