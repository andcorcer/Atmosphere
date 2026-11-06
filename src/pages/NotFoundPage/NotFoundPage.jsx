// Import all dependencies
import React from "react";
import { Link } from "react-router-dom";

// Import Styles
import {
  NotFoundPageContainer,
  NotFoundPageErrorCodeTitle,
  NotFoundPageErrorMessageTitle,
  NotFoundPageErrorText,
  NotFoundPageButton
} from "./NotFoundPage.styles";

// NotFoundPage Component
const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <NotFoundPageErrorCodeTitle>404</NotFoundPageErrorCodeTitle>
      <NotFoundPageErrorMessageTitle>Page Not Found</NotFoundPageErrorMessageTitle>
      <NotFoundPageErrorText>
        This URL path does not exist, has been changed or removed. Please check
        the URL or return to the home page.
      </NotFoundPageErrorText>
      <NotFoundPageButton>
        <Link to="/">
          Back to Home
        </Link>
      </NotFoundPageButton>
    </NotFoundPageContainer>
  );
};

// Export the NotFoundPage component
export default NotFoundPage;