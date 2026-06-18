import React from 'react'
import DaysMenu from "./DaysMenu"
import HourlyInfo from "./HourlyInfo"
import Sunny from './../assets/images/icon-sunny.webp';
import Storm from './../assets/images/icon-storm.webp';
import Snow from './../assets/images/icon-snow.webp';
import Rain from './../assets/images/icon-rain.webp';
import PartlyCloudy from './../assets/images/icon-partly-cloudy.webp';
import Overcast from './../assets/images/icon-overcast.webp';

function HourlyForecast() {
    return (
        <div className='flex w-fit h-fit pb-7 px-5 flex-col justify-between items-top rounded-2xl border border-[#3a3a5e] bg-[#25253f] md:mt-6'>
            {/* DAY SELECTOR */}
            <div className='flex justify-between items-center flex-row mt-3'>
                <p className='font-DM-Sans text-white'>
                    Hourly forecast
                </p>
                <div className='flex justify-end'>
                    <DaysMenu />
                </div>
            </div>

            {/* INFORMATION */}
            <div>
                <HourlyInfo />
                <HourlyInfo />
                <HourlyInfo />
                <HourlyInfo />
                <HourlyInfo />
                <HourlyInfo />
                <HourlyInfo />
                <HourlyInfo />
                <HourlyInfo />
            </div>
        </div>
    );
}

export default HourlyForecast