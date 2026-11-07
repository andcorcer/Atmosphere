// Import all dependencies
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import Components
import Layout from "../Layout/Layout";

// Import Pages
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";

// App Component
const App = () => {
  // Create the router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="city/:cityName" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
