import { useState } from "react";
import { WeatherContext } from "./weatherContext";
import getCountry from "../../API/geoService";
import { getWeather } from "../../API/weatherService";

export default function WeatherProvider({ children }) {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countryName, setCountryName] = useState("");

    const searchWeather = async (countryName) => {

        try {
            setLoading(true);
            setError(null);

            // Obtain coordinates
            const geoData = await getCountry(countryName);

            if (!geoData) {
                setError("Country not found");
                return;
            }

            setCountryName(geoData.name);
            const weatherData = await getWeather(geoData);
            setWeather(weatherData);

        } catch (err) {
            console.log(err);
            setError("Error fetching weather");

        } finally {
            setLoading(false);
        }
    };

    return (
        <WeatherContext.Provider
            value={{
                weather,
                countryName,
                loading,
                error,
                searchWeather
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}