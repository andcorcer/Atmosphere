# Atmosphere

[**Live Demo »**](https://atmosphere-web-app.netlify.app) &nbsp;·&nbsp; [**Bug Report**](https://github.com/andcorcer/Atmosphere/issues) &nbsp;·&nbsp; [**New Features**](https://github.com/andcorcer/Atmosphere/issues)

A small responsive React and Redux web application built with Vite that uses the `Open-Meteo` API to fetch the weather data (climate string from weather codes and temperature) for cities to display, add them to your wathlist, view in detail and see said info in the corresponding timezone.

---

## Features

- **Home Page**: Displays the details of the selected city and a list of cities in your watchlst or some default popular cities.
- **Search**: Allows to search cities by name andset the desired temperature displayed throught the entire application (between fahrenheit and celsius).
- **Watchlist Management**: Add or remove cities to your watchlist in the local storage memory and priority rendering in the home page.
- **Details Page**: Displays the search results for with a list of returned results and the details of a selected city.
- **Responsive Dark UI**: Fully accessible, design built with modern CSS custom properties and box-sizing normalization.

## Tech Stack

- **Frontend**: React 18, Redux Toolkit, Vite, Emotion CSS

- **Deployment**: Netlify (Frontend)

## Project Structure

```text
src/
├── components/
│   ├── App/
│   ├── CitiesContainer/
│   ├── DetailsCard/
│   ├── Error/
│   ├── Header/
│   ├── Layout/
│   ├── Loading/
│   ├── Search/
│   ├── UnitToggle/
│   └── WeatherCard/
├── pages/
│   ├── HomePage/
│   ├── NotFoundPage/
│   └── DetailsPage/
├── store/
│   ├── themeSlice.js
│   ├── watchlistSlice.js
│   ├── weatherSlice.js
│   └── store.js
├── styles/
│   ├── GlobalStyles.jsx
│   └── theme.js
├── utilities/
│   ├── forecastApi.js
│   ├── geocodingApi.js
│   └── temperatures.js
└── main.jsx
```

## Application Routes

| Path              | Component          | Description                                         |
| :---------------- | :----------------- | :-------------------------------------------------- |
| `/`               | `<HomePage />`     | Displays wtachlist or fallback cities               |
| `/city/:cityName` | `<DetailsPage />`  | Displays search results                             |
| `*`               | `<NotFoundPage />` | Fallback page for handling invalid or outdated URLs |

## State Management

The application uses Redux Toolkit to manage global state across 3 slices (`theme`, `watchlist` and `weather`):

```js
state = {
  theme: {
    theme: // "light" || "dark"
  },
  watchlist: {
    items: []
  },
  weather: {
    selectedCity: null,
    searchResults: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    units: "celsius", // 'celsius' || 'fahrenheit'
  },
};
```

## Getting Started

### Prerequisites

- **Node.js:** `v18.0.0` or higher

### Local Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/andcorcer/Atmosphere.git
   cd Atmosphere
   ```

2. **Frontend Setup**:

   ```bash
   # Install all Dependencies
   npm install

   # Run the Vite server (runs at http://localhost:5173)
   npm run dev
   ```

## Deployment Configuration

### Netlify

Just create a project for it since it doesn't use any environmental variables or any other external resources.
