// Import all dependencies
import React from "react";
import { Outlet } from "react-router-dom";

// Import Components
import Header from "../Header/Header";

// Import Styles
import { AppContainer, MainContainer } from './Layout.styles';

// Layout Component
const Layout = () => {
  return (
    <AppContainer>
      <Header />
      <MainContainer>
        <Outlet /> {/* This is where the nested routes will be rendered */}
      </MainContainer>
    </AppContainer>
  );
};

// Export the Layout component
export default Layout;