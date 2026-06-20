/*
    DailyForecastCard.jsx
    - Single tile component for the daily forecast list.
    - Shows day label, optional weather icon (from `weatherIcons`) and high/low temps.
*/
import { weatherIcons } from "../utils/weatherIcons";

// DaylyForecastCard renders one daily weather tile with icon and temperatures.
function DaylyForecastCard({Day, maxTemp, minTemp, weatherCode}) {

        // choose an icon based on the numeric weather code; empty string if none
        const icon = weatherIcons[weatherCode] || "";

    return (
        <div>
            {/* Daily forecast card: day label, weather icon, and temperature range */}
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


