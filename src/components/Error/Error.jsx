// Import all dependencies
import React from "react";

// Import Styles
import { ErrorContainer, ErrorText, ErrorButton } from "./Error.styles";

// Error Component
const Error = ({ error, onRetry }) => {
  // Extract a clean string for the UI
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "An unexpected error occurred. Please try again."; // Fallback message if error is not a string or doesn't have a message property

  return (
    <ErrorContainer>
      <ErrorText>⚠️ {errorMessage}</ErrorText>
      {onRetry && (
        <ErrorButton
          className="btn retry-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRetry();
          }}
        >
          Try Again
        </ErrorButton>
      )}
    </ErrorContainer>
  );
};

// Export the Error Component
export default Error;