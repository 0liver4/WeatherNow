/*
    MainInfoBox.jsx
    - Shows the large summary card for today's weather: location, date, and
        the current temperature icon/value.
    - Reads `weather` and `countryName` from `WeatherContext`.
*/
import { useContext } from 'react';
import todayBgSmall from './../assets/images/bg-today-small.svg';
import todayBgLarge from './../assets/images/bg-today-large.svg'
import { WeatherContext } from '../services/context/weather/weatherContext';
import { weatherIcons } from '../utils/weatherIcons';

// MainInfoBox displays current location, date and temperature information.
function MainInfoBox({ currentTemp, weatherCode }) {

    const { weather, countryName, loading, error } = useContext(WeatherContext);
    const icon = weatherIcons[weatherCode] || "";

    // 1. CARGANDO
    if (loading) {
        return (
            <div className='flex w-full h-72 flex-col justify-center items-center rounded-2xl border border-[#3a3a5e] bg-[#25253f] text-white opacity-60 font-DM-Sans animate-pulse'>
                <div className='flex flex-row gap-3'>
                    <div className='bg-white h-3 w-3 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='bg-white h-3 w-3 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='bg-white h-3 w-3 rounded-full animate-bounce'></div>
                </div>
                Loading
            </div>
        );
    }
    // 3. SIN DATOS AÚN (estado inicial, antes de cualquier búsqueda)
    if (!weather) {
        return (
            <div className='flex w-full h-72 flex-col justify-center items-center rounded-2xl border border-[#3a3a5e] bg-[#25253f] text-white opacity-40 font-DM-Sans'>
                Search for a place to see the weather
            </div>
        );
    }

    // 4. DATOS LISTOS
    return (
        <div className='relative w-fit'>
            <img
                src={todayBgSmall}
                alt="today's bg"
                className='block md:hidden object-cover'
            />
            <img
                src={todayBgLarge}
                alt="today's bg"
                className="hidden md:block w-full h-full object-cover"
            />
            <div className='absolute inset-0 flex items-center justify-center px-10 text-white flex-col md:flex-row md:justify-between md:items-center'>
                <div className='flex flex-col items-center md:items-start font-DM-Sans'>
                    <div className='font-bold text-4xl md:mt-0'>
                        {countryName}
                    </div>
                    <div className='text-sm opacity-60'>
                        {weather?.current?.fixedDate}
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center font-DM-sans mt-10 md:mt-0'>
                    <div className='w-30 h-30'>
                        {currentTemp && <img src={icon} className='w-full h-full border-0' alt="" />}
                    </div>
                    <div className='font-DM-Sans-Italic text-8xl'>
                        {!currentTemp ? "" : currentTemp + "°"}
                    </div>
                </div>
            </div>
        </div>
    );

} export default MainInfoBox