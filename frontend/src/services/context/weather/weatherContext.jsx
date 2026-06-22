import { createContext } from "react";

export const WeatherContext = createContext({
    weather: null,
    countryName: "",
    loading: false,
    error: null,
    searchWeather: () => {
        throw new Error("searchWeather must be used within a WeatherProvider");
    },
});