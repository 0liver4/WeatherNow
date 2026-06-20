WeatherNow — Frontend Architecture and Component Guide

Overview

This document explains the structure and runtime behavior of the WeatherNow frontend (React + Vite). It describes components, their connections, the centralized `WeatherContext`, service modules (geocoding and weather API), data transformations, and the runtime flows for search, day selection, and units switching.

Project layout (relevant files)

- src/
  - main.jsx — React entry; mounts app and wraps it with `WeatherProvider`.
  - App.jsx — top-level shell and simple title/header container.
  - components/
    - Body.jsx — main page content: search input, summary, cards, daily and hourly forecasts.
    - Header.jsx — top bar; includes `UnitsMenu`.
    - MainInfoBox.jsx — large summary card (location, date, main temperature).
    - LittleInfoCard.jsx — small metric card used for humidity, wind, precipitation, etc.
    - DailyForecastCard.jsx — daily forecast tile (one per day).
    - HourlyForecast.jsx — hourly list view; renders `DaysMenu` + rows of `HourlyInfo` for the selected day.
    - HourlyInfo.jsx — single-hour row (time, icon, temp)
    - DaysMenu.jsx — dropdown to pick the day to filter hourly entries (controlled component).
    - UnitsMenu.jsx — switch/select units (metric / imperial) and update the app units.
  - services/
    - axios/axiosInstance.js — pre-configured axios instances for weather and geo APIs.
    - API/geoService.js — geocoding helpers: `getCountry`, `getCountrySuggestions`.
    - API/weatherService.js — fetches weather from Open-Meteo and transforms the response into the app shape.
    - context/weather/
      - weatherContext.jsx — exports React context object.
      - weatherProvider.jsx — implements `WeatherProvider` that stores shared app state and functions.
  - utils/weatherIcons.js — mapping of Open-Meteo weather codes to local image paths.

Component responsibilities and interactions

1) main.jsx
- Wraps the app with `<WeatherProvider>` so child components can access shared weather state and actions.

2) WeatherProvider (services/context/weather/weatherProvider.jsx)
- Core responsibilities:
  - Holds `weather` (transformed app data), `loading`, `error`, `countryName`, `geoData`, and `units` in state.
  - Exposes actions: `searchWeather(countryOrPlace)`, `updateUnits(newUnits)`, and utility constants `metricUnits`, `imperialUnits`.
- Lifecycle notes:
  - `searchWeather` uses `geoService.getCountry(...)` to resolve a place to coordinates and stores `geoData`.
  - After resolving coordinates it calls `weatherService.getWeather(geoData, units)` to fetch and transform the forecast.
  - `updateUnits` updates the `units` object and re-fetches weather using the last known `geoData` (so switching units updates numeric values returned by the API).
- Why it exists: centralizes API calls and keeps UI components stateless consumer widgets that re-render when context changes.

3) Body.jsx
- User-visible page that contains search input and the main weather visualizations.
- Uses `WeatherContext` to call `searchWeather` and to read `weather`, `loading`, `countryName`, and `units` for display.
- Passes `dailyDays` and hourly arrays (times & values) down to `HourlyForecast` for localized rendering.
- Implements debounced suggestion input using `geoService.getCountrySuggestions` to show places as the user types.

4) UnitsMenu.jsx
- Reads `units` and `updateUnits` from context.
- Allows switching between the two presets (`metricUnits` and `imperialUnits`) and may expose individual unit selectors for temperature, wind, and precipitation.
- Calls `updateUnits(...)` which triggers `WeatherProvider` to refresh forecasts with new API parameters.

5) DaysMenu.jsx + HourlyForecast.jsx + HourlyInfo.jsx
- `DaysMenu` is a controlled dropdown: parent (`HourlyForecast`) passes `selectedDay` and `onChange(day)`.
- `HourlyForecast` computes `availableDays` from the `hourlyTime` or `dailyDays` data, stores `selectedDay` in local state, and filters hourly entries where the timestamp's day matches the selectedDay.
  - Filtering logic (conceptual): parse `hourlyTime` entries to Date objects (or compare date strings), then only keep entries that match the selected day label.
- `HourlyInfo` simply renders a row for a single hour (label, icon, temp unit).

Services and API flow

1) axiosInstance
- Exposes two axios clients: `geoApi` and `weatherApi`, preconfigured with base URLs, timeouts, and interceptors if needed.

2) geoService.getCountry / getCountrySuggestions
- `getCountry(query)` requests the geocoding endpoint, returns an object with lat/lon and normalized place name.
- `getCountrySuggestions(query)` is used for the typeahead in `Body.jsx` and returns an array of suggestion objects.

3) weatherService.getWeather(countryOrGeoData, units)
- Accepts a `country` or `geoData` (object with lat/lon) and a `units` object specifying:
  - `temperature_unit` ("celsius" or "fahrenheit")
  - `wind_speed_unit` ("ms" or "mph")
  - `precipitation_unit` ("mm" or "inch")
- Adds these unit query params to the Open-Meteo request so the API returns values already converted.
- Transforms the raw API response into an app-friendly shape containing:
  - `days[]` (each with date, label, max/min temps, weather code)
  - `hours[]` / `hourly` arrays (parallel arrays: `hourly.time`, `hourly.temperature_2m`, `hourly.weathercode`, ...)
  - `current` simplified object (temperature, feels_like, precipitation_now, etc.)
- This transformation centralizes logic so the UI components don't parse raw API shapes.

Data mapping and example flows

- Search flow (user types a place and selects it):
  1. Body calls `searchWeather(selectedPlace)` from context.
  2. `WeatherProvider` calls `geoService.getCountry(selectedPlace)` -> returns `geoData` (lat/lon, name).
  3. `WeatherProvider` calls `weatherService.getWeather(geoData, units)`.
  4. `weatherService` fetches Open-Meteo with `temperature_unit`, `wind_speed_unit`, `precipitation_unit` set per `units` and returns transformed `weather` object.
  5. `WeatherProvider` sets `weather` state; Body and all consumers re-render.

- Units switch flow (user toggles metric/imperial):
  1. UnitsMenu calls `updateUnits(newUnits)` on context.
  2. `WeatherProvider` sets `units = newUnits` and re-calls `weatherService.getWeather(geoData, units)` using cached `geoData`.
  3. Transformed weather values reflect the requested units (wind speed in mph if imperial), and components display accordingly.

Notes on Hour/Day filtering

- The app stores hourly timestamps in `hourly.time` (ISO strings). To show only the hours for "Monday" for example:
  - Convert each `time` string to a Date (or extract `YYYY-MM-DD`) and compare with the day label computed from `dailyDays` or `Date`'s `getDay()` value.
  - The `DaysMenu` provides textual labels; `HourlyForecast` maps those labels to actual dates in the hourly arrays.

Where to change UI unit labels

- Numeric values come from the API converted to the requested units.
- Unit labels shown near numbers ("°C", "°F", "km/h", "mph", "mm", "in") are controlled by the UI components and should be derived from `units` (add a small helper in `WeatherProvider` that returns a mapping from `units` to label strings to avoid hardcoded labels across components).

How to run and test

- Install dependencies: `npm install` in the `frontend` folder.
- Run dev server: `npm run dev`.
- Build for production: `npm run build`.
- Lint: `npm run lint` (note: the workspace has a known ESLint config issue; if `npm run lint` fails, inspect `eslint.config.js` and remove duplicate `defineConfig` declarations).

Notes, caveats, and next steps

- Linting: there is a configuration-level ESLint error unrelated to the runtime changes; address `eslint.config.js` to make `npm run lint` pass.
- Comments: many components already include header comments; consider adding short top-of-file headers to any remaining files for consistency.
- Unit label helper: create a helper in `WeatherProvider` returning `unitLabels` so components can display the correct suffix for temperature/wind/precipitation without hardcoding strings.
- Testing: visually validate `DaysMenu` filtering by running `npm run dev`, picking a day in the dropdown, and verifying the hourly rows are restricted to that day. Toggle units and observe numeric changes.

If you want, I can:
- Add `unitLabels` helper into the provider and update `LittleInfoCard` and `HourlyInfo` to use it.
- Generate per-file header comments for any remaining files that don't yet include them.
- Fix the ESLint config error if you want lint to pass.

---
Generated by GitHub Copilot (GPT-5 mini).
