
import { weatherApi } from "../axios/axiosInstance";
import { geoApi } from "../axios/axiosInstance";

export const getWeather = async (country) => {

    try {

        const response = await weatherApi.get("", {
            params: {
                latitude: country.latitude,
                longitude: country.longitude,

                current: [
                    "precipitation",
                    "temperature_2m",
                    "wind_speed_10m",
                    "relative_humidity_2m"
                ].join(","),

                hourly: [
                    "temperature_2m",
                    "precipitation"
                ].join(","),

                daily: [
                    "temperature_2m_max",
                    "temperature_2m_min"
                ].join(","),

                temperature_unit: temp
            }
        });

        const data = response.data;

        // Objeto simplificado
        const weatherData = {

            location: {
                latitude: data.latitude,
                longitude: data.longitude,
                elevation: data.elevation,
                timezone: data.timezone
            },

            current: {
                time: data.current.time,
                precipitation: data.current.precipitation,
                temperature_2m: data.current.temperature_2m,
                wind_speed_10m: data.current.wind_speed_10m,
                relative_humidity_2m:
                    data.current.relative_humidity_2m
            },

            hourly: {
                time: data.hourly.time,
                temperature_2m:
                    data.hourly.temperature_2m,
                precipitation:
                    data.hourly.precipitation
            },

            daily: {
                time: data.daily.time,

                temperature_2m_max:
                    data.daily.temperature_2m_max,

                temperature_2m_min:
                    data.daily.temperature_2m_min
            }
        };

        return weatherData;

    } catch (error) {

        console.log("Error:", error);

        return null;
    }
};