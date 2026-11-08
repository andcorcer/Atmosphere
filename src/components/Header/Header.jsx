// Import all dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";

// Import Actions
import { setTheme } from "../../store/themeSlice";

// Import Styles
import { HeaderContainer, HeaderTitle, HeaderButtonsContainer, HeaderButton } from './Header.styles';

// Header Component
const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleThemeToggle = (SelectedTheme) => {
    dispatch(setTheme(SelectedTheme));
  };

  return (
    <HeaderContainer>
        <HeaderTitle className="title">
          <Link to="/">Atmosphere</Link>
        </HeaderTitle>
        <HeaderButtonsContainer>
          <HeaderButton $active={theme === "light"} onClick={() => handleThemeToggle("light")}>
            <Sun />
          </HeaderButton>
          <HeaderButton $active={theme === "dark"} onClick={() => handleThemeToggle("dark")}>
            <Moon />
          </HeaderButton>
        </HeaderButtonsContainer>
    </HeaderContainer>
  );
};

// Export the Header component
export default Header;