import React, { useContext } from "react";
import Sunny from './../assets/images/icon-sunny.webp';
import { WeatherContext } from "../services/context/weather/weatherContext";
import { weatherIcons } from "../utils/weatherIcons";

function DaylyForecastCard({Day, maxTemp, minTemp, weatherCode}) {

    const { weather } = useContext(WeatherContext);
    const icon = weatherIcons[weatherCode] || "";

    return (
        <div>
            <div className='flex w-26 h-40 flex-col justify-start items-top rounded-2xl border border-[#3a3a5e] bg-[#25253f]'>
                <div className="flex flex-col">
                    <div className="flex justify-center mt-3">
                        <p>
                            {Day}
                        </p>
                    </div>

                    {/* ICON */}
                    <div className="flex justify-center">
                        {
                            icon ? <img src={icon} alt="icon" className="w-15 mt-4" /> : ""
                        }
                    </div>

                    {/* TEMPERATURE */}
                    <div className="flex justify-between text-sm px-3 mt-3">
                        <div className="font-extralight">
                            {!maxTemp ? "" : maxTemp + "°"}
                        </div>
                        <div className="font-extralight text-sm opacity-80">
                            {!minTemp ? "" : minTemp + "°"}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default DaylyForecastCard;


