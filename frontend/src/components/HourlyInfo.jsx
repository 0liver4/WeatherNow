import React from "react";
import Sunny from './../assets/images/icon-sunny.webp';
import Storm from './../assets/images/icon-storm.webp';
import Snow from './../assets/images/icon-snow.webp';
import Rain from './../assets/images/icon-rain.webp';
import PartlyCloudy from './../assets/images/icon-partly-cloudy.webp';
import Overcast from './../assets/images/icon-overcast.webp';
import { WeatherContext } from "../services/context/weather/weatherContext"; 

function Hourlyinfo() {
    
    return (

        <div className='flex w-full h-fit flex-col justify-start items-top rounded-xl border border-[#4b4b66] bg-[#3e3d60] mt-3'>
            <div className="flex flex-row items-center justify-between gap-30 px-2 py-2">
            {/* ICON AND HOUR */}
                <div className="flex flex-row items-center gap-2">
                    <img src={Overcast} alt="Icon" className="w-10"/>
                    <p className="text-white text-xl" >
                        {`3 PM`}
                    </p>
                </div>
                
                {/* TEMPERATURE */}
                <p className="text-white mr-2">
                    {`temp`}
                </p>
            </div>
        </div>

    );
}
export default Hourlyinfo;