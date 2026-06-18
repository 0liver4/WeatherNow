import React, { useContext, useState } from "react";
import searchIcon from './../assets/images/icon-search.svg'
import MainInfoBox from "./MainInfoBox";
import LittleInfoCard from "./LittleInfoCard";
import DaylyForecastCard from "./DailyForecastCard";
import HourlyForecast from "./HourlyForecast";
import getCountry from "../services/API/geoService";
import { getWeather } from "../services/API/weatherService";
import { WeatherContext } from "../services/context/weather/weatherContext";

function Body() {

    const { weather, searchWeather } = useContext(WeatherContext);
    const [country, setCountry] = useState("");

    const handleSearch = async () => {
        await searchWeather(country);
    };

    return (

        //BODY
        <div>
            {/* SEARCH BAR */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full px-4">
                <div className="bg-[#34335B] text-white rounded-lg px-4 py-2 w-full md:w-80 flex flex-row items-center cursor-pointer  focus-within:outline focus-within:outline-2 focus-within:outline-white">
                    <img src={searchIcon} alt="Search" className="w-4 h-4 inline mr-2" />

                    <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        className="w-full bg-transparent border-none focus:outline-none"
                        placeholder="Search for a place..." />
                </div>
                <button
                    onClick={handleSearch}
                    type="summit"
                    className="bg-[#4657da] text-white rounded-lg w-full md:w-auto px-4 py-2 cursor-pointer focus-within:ring-2 focus-within:ring-[#4657da]">
                    Search
                </button>
            </div>

            {/* INFO */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-10">

                {/* LEFT INFO */}
                <section className="text-white mt-10 mb-10">
                    {/* MAIN INFORMATION CARD */}
                    <MainInfoBox country={country} />

                    {/* LITTLE CARDS WITH INFO */}
                    <div className="grid grid-cols-2 mt-5 md:flex md:flex-row justify-center gap-x-5 gap-y-5 md:gap-13">
                        <LittleInfoCard
                            title="Humidity"
                            info={weather?.current?.relative_humidity_2m ? weather?.current?.relative_humidity_2m + "°" : ""}
                        />

                        <LittleInfoCard
                            title="Wind"
                            info={weather?.current?.wind_speed_10m ? weather?.current?.wind_speed_10m + "%" : ""}
                        />

                        <LittleInfoCard
                            title="Temperature"
                            info={weather?.current?.temperature_2m ? weather?.current?.temperature_2m + "km/h" : ""}
                        />

                        <LittleInfoCard
                            title="Precipitation"
                            info={weather?.current?.precipitation ? weather.current.precipitation + " mm" : ""}
                        />
                    </div>

                    {/* DAILY FORECAST INFORMATION CARDS */}
                    <section className="mt-15">

                        {/* TITLE */}
                        <p className="font-DM-Sans text-xl my-5">
                            Daily Forecast
                        </p>
                        {/* DAYLY FORECAST INFORMATION */}
                        <div className="grid grid-cols-3 md:flex md:flex-row gap-3">
                            <DaylyForecastCard
                                Day="Sunday" /

                            >

                        </div>
                    </section>
                </section>

                {/* RIGHT INFO (HOURLY FORECAST) */}

                <section>
                    <HourlyForecast />
                </section>

            </div>
        </div>
    );
}

export default Body