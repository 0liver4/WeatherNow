import { weatherIcons } from "../utils/weatherIcons";

// HourlyInfo renders a single hourly forecast row.
function HourlyInfo({ hours, hourlyTemp, weatherCode }) {

    const icon = weatherIcons[weatherCode] || "";
    
    // Hourly forecast row: hour label, icon and temperature
    return (
        <div className='flex w-full h-fit flex-col justify-start items-top rounded-xl border border-[#4b4b66] bg-[#3e3d60] mt-3'>
            <div className="flex flex-row items-center justify-between gap-32 md:gap-20 px-2 py-2">

                {/* ICON AND HOUR */}
                <div className={`flex flex-row items-center ${hours ? "gap-2" : "gap-16"} h-10`}>

                    <div className="w-8">
                        {
                            icon ? <img src={icon} alt="icon" className="w-20" /> : ""
                        }
                    </div>

                    <p className="text-white text-xl">
                        {hours}
                    </p>
                </div>

                {/* TEMPERATURE */}
                <p className="text-white text-sm w-10">
                    {
                    !hourlyTemp ? "" : hourlyTemp + "°"
                    }
                </p>
            </div>
        </div>
    );
}

export default HourlyInfo;