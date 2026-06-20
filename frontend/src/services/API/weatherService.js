import { weatherApi } from "../axios/axiosInstance";

// Fetches and transforms raw weather API data into app-friendly shape.
export const getWeather = async (country, units = {
    wind_speed_unit: "ms",
    temperature_unit: "celsius",
    precipitation_unit: "mm",
}) => {

    const daysNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    try {

        const response = await weatherApi.get("", {
            params: {

                latitude: country.latitude,
                longitude: country.longitude,
                timezone: country.timezone,
                past_days: 7,

                current: [
                    "precipitation",
                    "is_day",
                    "temperature_2m",
                    "wind_speed_10m",
                    "relative_humidity_2m",
                    "apparent_temperature",
                    "weather_code",
                ].join(","),

                hourly: [
                    "temperature_2m",
                    "precipitation",
                    "weather_code"
                ].join(","),

                daily: [
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "weather_code"
                ].join(","),

                temperature_unit: units.temperature_unit,
                wind_speed_unit: units.wind_speed_unit,
                precipitation_unit: units.precipitation_unit,
            }
        });

        const data = response.data;


        //TRANSFORM FROM DATES TO DAY NAMES
        const days = data.daily.time.map((date) => {

            const [year, month, day] = date.split("-");

            const localDate = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

            return daysNames[localDate.getDay()];
        });

        const date = new Date(data.current.time);

        const customDate = date.toLocaleDateString(
            "en-GB",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        );


        const hours = data.hourly.time.map((time) => {

            return new Date(time).toLocaleTimeString(
                "en-US",
                {
                    hour: "numeric",
                    hour12: true
                }
            );

        });

        const weatherData = {

            location: {
                latitude: data.latitude,
                longitude: data.longitude,
                elevation: data.elevation,
                timezone: data.timezone
            },

            current: {
                time: data.current?.time,

                fixedDate: customDate,

                is_day:
                    data.current?.is_day,

                precipitation:
                    data.current?.precipitation,

                temperature_2m:
                    data.current?.temperature_2m,

                wind_speed_10m:
                    data.current?.wind_speed_10m,

                relative_humidity_2m:
                    data.current?.relative_humidity_2m,

                apparent_temperature:
                    data.current?.apparent_temperature,

                weather_code:
                    data.current?.weather_code
            },

            hourly: {
                time: data.hourly?.time,

                hours: hours,

                temperature_2m:
                    data.hourly?.temperature_2m,

                precipitation:
                    data.hourly?.precipitation,

                weather_code:
                    data.hourly?.weather_code
            },

            daily: {
                time: data.daily?.time,

                days: days,

                temperature_2m_max:
                    data.daily?.temperature_2m_max,

                temperature_2m_min:
                    data.daily?.temperature_2m_min,

                weather_code:
                    data.daily?.weather_code
            }

        };

        console.log(weatherData);

        return weatherData;

    } catch (error) {

        console.log(
            "WEATHER ERROR:",
            error
        );

        return null;
    }
};