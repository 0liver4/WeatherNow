import { useEffect, useState } from "react";
import { WeatherContext } from "./weatherContext";
import getCountry from "../../API/geoService";
import { getWeather } from "../../API/weatherService";

const metricUnits = {
    wind_speed_unit: "ms",
    temperature_unit: "celsius",
    precipitation_unit: "mm",
    system: "metric",
};

const imperialUnits = {
    wind_speed_unit: "mph",
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
    system: "imperial",
};

export default function WeatherProvider({ children }) {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // ERROR = 1 NO COUNTRIES FOUND, ERROR = 2 NO DATA FROM THE API
    const [countryName, setCountryName] = useState("");
    const [geoData, setGeoData] = useState(null);
    const [units, setUnits] = useState(metricUnits);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    const searchWeather = async (countryName) => {
        try {
            setLoading(true);
            setError(null);

            // Obtain coordinates from geocoding API
            const geoInfo = await getCountry(countryName);

            if (!geoInfo) {
                setError(1);
                return;
            }

            setCountryName(geoInfo.name);
            setGeoData(geoInfo);
            const weatherData = await getWeather(geoInfo, units);
            setWeather(weatherData);
        } catch (err) {
            console.log(err);
            setError(2);
        } finally {
            setLoading(false);
        }
    };

    const updateUnits = async (newUnits) => {
        setUnits(newUnits);

        if (!geoData) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const weatherData = await getWeather(geoData, newUnits);
            setWeather(weatherData);
        } catch (err) {
            console.log(err);
            setError("Error updating units");
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
                units,
                searchWeather,
                updateUnits,
                metricUnits,
                imperialUnits,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}