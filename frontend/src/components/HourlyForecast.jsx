/*
HourlyForecast.jsx
- Renders the hourly forecast list and provides a day selector (`DaysMenu`).
- Filters hourly entries by the selected day using the `hourlyTime` timestamps.
- Expects `hours`, `hourlyTemp`, `weatherCode` and `hourlyTime` props
provided by the parent `Body` component.
*/
import { useEffect, useMemo, useState } from 'react';
import DaysMenu from "./DaysMenu";
import HourlyInfo from "./HourlyInfo";
import dayNames from "../utils/dayNames"

function HourlyForecast({ hours, hourlyTemp, weatherCode, hourlyTime }) {
    const [selectedDay, setSelectedDay] = useState(dayNames[0]);

    const filteredIndexes = useMemo(() => {
        if (!hourlyTime || !selectedDay) return [];

        return hourlyTime.map((time, index) => {
            const date = new Date(time);
            const dayName = dayNames[date.getDay()];
            return { index, dayName };
        })
            .filter((item) => item.dayName === selectedDay)
            .map((item) => item.index);
    }, [hourlyTime, selectedDay]);

    const displayedRows = useMemo(() => {
        if (!hours || filteredIndexes.length === 0) {
            return Array.from({ length: 8 }).map((_, index) => ({ key: index }));
        }

        return filteredIndexes.map((index) => ({
            key: index,
            hour: hours[index],
            temp: hourlyTemp?.[index],
            code: weatherCode?.[index],
        }));
    }, [hours, hourlyTemp, weatherCode, filteredIndexes]);

    return (
        <div className='flex w-fit h-fit pb-7 px-7 flex-col justify-between items-top rounded-2xl border border-[#3a3a5e] bg-[#25253f] md:mt-6'>
            {/* DAY SELECTOR */}
            <div className='flex justify-between items-center flex-row mt-3'>
                <p className='font-DM-Sans text-white'>
                    Hourly forecast
                </p>
                <div className='flex justify-end'>
                    <DaysMenu
                        days={dayNames}
                        selectedDay={selectedDay}
                        onChange={setSelectedDay}
                    />
                </div>
            </div>

            {/* INFORMATION */}
            <div className='flex flex-col gap-2 mt-3 max-h-150 overflow-y-auto pr-2'>
                {displayedRows.map((row) => (
                    <HourlyInfo
                        key={row.key}
                        hours={row.hour}
                        hourlyTemp={row.temp}
                        weatherCode={row.code}
                    />
                ))}
            </div>
        </div>
    );
}

export default HourlyForecast