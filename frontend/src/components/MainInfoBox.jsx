import react, { useEffect } from 'react';
import todayBgSmall from './../assets/images/bg-today-small.svg';
import todayBgLarge from './../assets/images/bg-today-large.svg'
import Sunny from './../assets/images/icon-sunny.webp';
import { useState } from 'react';

function MainInfoBox() {

    const [country, setCountry] = useState();

    useEffect(()=>{
        

    },[country])

    return (
        <div className='relative w-fit'>

            <img
                src={todayBgSmall}
                alt="today's bg"
                className='block md:hidden objetc-cover'
            />

            <img
                src={todayBgLarge}
                alt="today,s bg"
                className="hidden md:block w-full h-full object-cover"
            />

            <div className='absolute inset-0 flex items-center justify-center px-10 text-white flex-col md:flex-row md:justify-between md:items-center'>
                {/* Country and date text */}
                <div className='flex flex-col items-center md:items-start font-DM-Sans'>
                    <div className='font bold text-4xl  md:mt-0'>
                        {`Country, City`}
                    </div>
                    <div className='text-sm opacity-60'>
                        {`Day, Month, Year`}
                    </div>
                </div>

                {/* Temperature */}
                <div className='flex flex-row justify-center items-center font-DM-sans mt-10 md:mt-0'>
                    <img src={Sunny} alt="Sunny" className='w-30 h-30' />
                    <div className='font-DM-Sans-Italic text-8xl'>
                        {`35°`}
                    </div>
                </div>
            </div>

        </div>
    );

} export default MainInfoBox