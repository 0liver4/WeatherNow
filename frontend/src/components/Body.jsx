import React, { useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import searchIcon from './../assets/images/icon-search.svg'
import MainInfoBox from "./MainInfoBox";
import LittleInfoCard from "./LittleInfoCard";
import DaylyForecastCard from "./DailyForecastCard";
import HourlyForecast from "./HourlyForecast";
import { getCountrySuggestions } from "../services/API/geoService";
import { getWeather } from "../services/API/weatherService";
import { WeatherContext } from "../services/context/weather/weatherContext";

function Body() {

    const { weather, searchWeather } = useContext(WeatherContext);
    const [search, setSearch] = useState("");
    const [searchedCountry, setSearchedCountry] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const inputWrapperRef = useRef(null);
    const debounceRef = useRef(null);

    const handleSearch = async (term = search) => {
        setOpen(false);
        setSearchedCountry(term);
        await searchWeather(term);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (value.trim().length < 2) {
            setSuggestions([]);
            setOpen(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            const results = await getCountrySuggestions(value);
            setSuggestions(results);
            setOpen(results.length > 0);
        }, 400);
    };

    // Solo autocompleta el input, no busca
    const handleSelectSuggestion = (place) => {
        const label = place.admin1
            ? `${place.name}, ${place.country}`
            : place.name;

        setSearch(label);
        setOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    return (
        <div>
            {/* SEARCH BAR */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full px-4">
                <div ref={inputWrapperRef} className="bg-[#34335B] text-white rounded-lg px-4 py-2 w-full md:w-80 flex flex-row items-center cursor-pointer focus-within:outline-2 focus-within:outline-white">
                    <img src={searchIcon} alt="Search" className="w-4 h-4 inline mr-2" />

                    <input
                        value={search}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => suggestions.length > 0 && setOpen(true)}
                        type="text"
                        className="w-full bg-transparent border-none focus:outline-none"
                        placeholder="Search for a place..." />
                </div>

                {open &&
                    createPortal(
                        <SearchDropdown
                            anchorRef={inputWrapperRef}
                            suggestions={suggestions}
                            onSelect={handleSelectSuggestion}
                            onClose={() => setOpen(false)}
                        />,
                        document.body
                    )}

                <button
                    onClick={() => handleSearch()}
                    type="button"
                    className="bg-[#4657da] text-white rounded-lg w-full md:w-auto px-4 py-2 cursor-pointer focus-within:ring-2 focus-within:ring-[#4657da]">
                    Search
                </button>
            </div>

            {/* INFO */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-10">
                <section className="text-white mt-10 mb-10">
                    <MainInfoBox searchedCountry={searchedCountry} currentTemp={weather?.current?.temperature_2m} />

                    <div className="grid grid-cols-2 mt-5 md:flex md:flex-row justify-center gap-x-5 gap-y-5 md:gap-13">
                        <LittleInfoCard
                            title="Feels like"
                            info={!weather?.current?.temperature_2m ? "" : weather?.current?.apparent_temperature + "°"}
                        />
                        <LittleInfoCard
                            title="Humidity"
                            info={!weather?.current?.relative_humidity_2m ? "" : weather?.current?.relative_humidity_2m + "%"}
                        />
                        <LittleInfoCard
                            title="Wind"
                            info={!weather?.current?.wind_speed_10m ? "" : weather?.current?.wind_speed_10m + " km/h"}
                        />
                        <LittleInfoCard
                            title="Precipitation"
                            info={weather?.current?.precipitation == undefined ? "" : weather?.current?.precipitation + " mm"}
                        />
                    </div>

                    <section className="mt-15">
                        <p className="font-DM-Sans text-xl my-5">
                            Daily Forecast
                        </p>
                        <div className="grid grid-cols-3 md:flex md:flex-row gap-3">
                            {
                                !weather
                                    ? Array.from({ length: 7 }).map((_, index) => (
                                        <DaylyForecastCard key={index} />
                                    ))
                                    : weather?.daily?.days?.slice(0, 7).map((day, index) => (
                                        <DaylyForecastCard
                                            key={index}
                                            Day={day}
                                            maxTemp={weather.daily.temperature_2m_max[index]}
                                            minTemp={weather.daily.temperature_2m_min[index]}
                                            weatherCode={weather.daily.weather_code[index]}
                                        />
                                    ))
                            }
                        </div>
                    </section>
                </section>

                <section className="">
                    <HourlyForecast
                        hours={weather?.hourly?.hours}
                        hourlyTemp={weather?.hourly?.temperature_2m}
                        weatherCode={weather?.hourly?.weather_code}
                    />
                </section>
            </div>
        </div>
    );
}

function SearchDropdown({ anchorRef, suggestions, onSelect, onClose }) {

    const dropdownRef = useRef(null);
    const rect = anchorRef.current?.getBoundingClientRect();

    useEffect(() => {
        const handleClickOutside = (e) => {
            const clickedInput = anchorRef.current?.contains(e.target);
            const clickedDropdown = dropdownRef.current?.contains(e.target);
            if (!clickedInput && !clickedDropdown) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [anchorRef, onClose]);

    if (!rect) return null;

    return (
        <div
            ref={dropdownRef}
            className="fixed z-9999 bg-[#232244] rounded-2xl p-2 text-white shadow-lg"
            style={{
                top: rect.bottom + 10,
                left: rect.left,
                width: rect.width,
            }}
        >
            <div className="flex flex-col gap-1">
                {suggestions.map((place, index) => (
                    <button
                        key={`${place.id}-${index}`}
                        type="button"
                        onClick={() => onSelect(place)}
                        className="p-3 rounded-xl text-left hover:bg-[#34335B]"
                    >
                        {place.name}
                        {place.admin1 ? `, ${place.admin1}` : ""}
                        {place.country ? `, ${place.country}` : ""}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Body