// Import all dependencies
import React from "react";
import { Link } from "react-router-dom";

// Import Styles
import { HeaderContainer, HeaderTitle } from './Header.styles';

// Header Component
const Header = () => {
  return (
    <HeaderContainer>
        <HeaderTitle className="title">
          <Link to="/">Atmosphere</Link>
        </HeaderTitle>
    </HeaderContainer>
  );
};

// Export the Header component
export default Header;