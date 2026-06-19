import React from 'react'
import DaysMenu from "./DaysMenu"
import HourlyInfo from "./HourlyInfo"

function HourlyForecast({ hours, hourlyTemp, weatherCode }) {
    return (
        <div className='flex w-fit h-fit pb-7 px-7 flex-col justify-between items-top rounded-2xl border border-[#3a3a5e] bg-[#25253f] md:mt-6'>
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
            <div className='flex flex-col gap-2 mt-3 max-h-150 overflow-y-auto pr-2'>
                {
                    !hours ?
                        Array.from({ length: 8 }).map((_, index) => (
                            <HourlyInfo key={index} />
                        ))

                        : hours.slice(0, 24).map((hour, index) => (
                            <HourlyInfo
                                key={index}
                                hours={hour}
                                hourlyTemp={hourlyTemp[index]}
                                weatherCode={weatherCode[index]}
                            />
                        ))
                }
            </div>
        </div>
    );
}

export default HourlyForecast