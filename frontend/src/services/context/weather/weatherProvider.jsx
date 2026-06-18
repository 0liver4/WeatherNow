import { useState } from "react";
import { WeatherContext } from "./weatherContext";
import getCountry from "../../API/geoService";
import { getWeather } from "../../API/weatherService";

export default function WeatherProvider({ children }) {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchWeather = async (countryName) => {

        try {
            setLoading(true);
            setError(null);

            // Obtener coordenadas
            const geoData = await getCountry(countryName);

            if (!geoData) {
                setError("Country not found");
                return;
            }
            const weatherData = await getWeather(geoData);
            setWeather(weatherData);
            console.log(weatherData)

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
                loading,
                error,
                searchWeather
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}