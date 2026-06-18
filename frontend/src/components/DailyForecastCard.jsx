import React, { useContext } from "react";
import Sunny from './../assets/images/icon-sunny.webp';
import Storm from './../assets/images/icon-storm.webp'
import Snow from './../assets/images/icon-snow.webp'
import Rain from './../assets/images/icon-rain.webp'
import PartlyCloudy from './../assets/images/icon-partly-cloudy.webp'
import Overcast from './../assets/images/icon-overcast.webp'
import { WeatherContext } from "../services/context/weather/weatherContext";

function DaylyForecastCard({Day, From, To, Icon}) {

    const { weather } = useContext(WeatherContext);

    


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
                        <img src={Icon} alt="" className="w-15 mt-4" />
                    </div>

                    {/* TEMPERATURE */}
                    <div className="flex justify-between px-3 mt-3">
                        <div className="font-extralight">
                            {From}
                        </div>
                        <div className="font-extralight opacity-80">
                            {To}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default DaylyForecastCard;