import { useState, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { WeatherContext } from "../services/context/weather/weatherContext";
import unitsIcon from '../assets/images/icon-units.svg';
import dropdownIcon from '../assets/images/icon-dropdown.svg';

function UnitsMenu() {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const { units, updateUnits, metricUnits, imperialUnits } = useContext(WeatherContext);

    return (
        <div className="relative">
            {/* Units selector button and portal dropdown */}

            {/* BOTON */}
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className="bg-[#2B2A4A] px-4 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 rounded-xl text-white flex flex-row gap-2 pointer-cursor items-center"
            >
                <img src={unitsIcon} alt="Units Icon" className="w-4 h-4 sm:w-5 sm:h-5" />
                Units
                <img src={dropdownIcon} alt="Dropdown Icon" className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            {/* PORTAL */}
            {open &&
                createPortal(
                    <Dropdown
                        buttonRef={buttonRef}
                        units={units}
                        updateUnits={updateUnits}
                        metricUnits={metricUnits}
                        imperialUnits={imperialUnits}
                        isImperial={units?.system === "imperial"}
                        closeMenu={() => setOpen(false)}
                    />,
                    document.body
                )}
        </div>
    );
}

function Dropdown({ buttonRef, units, updateUnits, metricUnits, imperialUnits, isImperial, closeMenu }) {

    const rect = buttonRef.current?.getBoundingClientRect();
    const switchLabel = isImperial ? "Switch to Metric" : "Switch to Imperial";
    const activeClass = (condition) => condition ? "bg-[#34335B]" : "hover:bg-[#34335B]";

    return (
        <div
            className="fixed z-9999 w-72 bg-[#232244] rounded-2xl p-4 text-white shadow-lg"
            style={{
                top: rect.bottom + 10,
                left: rect.left - 180,
            }}
        >

            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => {
                        updateUnits(isImperial ? metricUnits : imperialUnits);
                        closeMenu();
                    }}
                    className="p-3 rounded-xl w-full text-left bg-[#34335B] hover:bg-[#3e3d60]"
                >
                    {switchLabel}
                </button>
            </div>

            <div className="mb-6">
                <p className="text-gray-400 mb-2">Temperature</p>

                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => updateUnits(metricUnits)}
                        className={`p-3 rounded-xl text-left ${activeClass(units.temperature_unit === "celsius")}`}
                    >
                        Celsius (°C)
                    </button>

                    <button
                        type="button"
                        onClick={() => updateUnits(imperialUnits)}
                        className={`p-3 rounded-xl text-left ${activeClass(units.temperature_unit === "fahrenheit")}`}
                    >
                        Fahrenheit (°F)
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-gray-400 mb-2">Wind Speed</p>

                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => updateUnits({ ...units, wind_speed_unit: "ms", system: "metric" })}
                        className={`p-3 rounded-xl text-left ${activeClass(units.wind_speed_unit === "ms")}`}
                    >
                        km/h
                    </button>

                    <button
                        type="button"
                        onClick={() => updateUnits({ ...units, wind_speed_unit: "mph", system: "imperial" })}
                        className={`p-3 rounded-xl text-left ${activeClass(units.wind_speed_unit === "mph")}`}
                    >
                        mph
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-gray-400 mb-2">Precipitation</p>

                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => updateUnits({ ...units, precipitation_unit: "mm", system: "metric" })}
                        className={`p-3 rounded-xl text-left ${activeClass(units.precipitation_unit === "mm")}`}
                    >
                        Millimeters (mm)
                    </button>

                    <button
                        type="button"
                        onClick={() => updateUnits({ ...units, precipitation_unit: "inch", system: "imperial" })}
                        className={`p-3 rounded-xl text-left ${activeClass(units.precipitation_unit === "inch")}`}
                    >
                        Inches (in)
                    </button>
                </div>
            </div>

        </div>
    );
}

export default UnitsMenu;