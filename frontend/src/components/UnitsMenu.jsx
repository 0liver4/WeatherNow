import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import unitsIcon from '../assets/images/icon-units.svg';
import dropdownIcon from '../assets/images/icon-dropdown.svg';

function UnitsMenu() {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

    return (
        <div className="relative">

            {/* BOTON */}
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className="bg-[#2B2A4A] px-4 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 rounded-xl text-white flex flex-row gap-2 pointer-cursor items-center"
            >
                <img src={unitsIcon} alt="Units Icon" className="w-4 h-4 sm:w-5 sm:h-5" onClick={() => setOpen(!open)} ref={buttonRef} />
                Units
                <img src={dropdownIcon} alt="Dropdown Icon" className="w-3 h-3 sm:w-4 sm:h-4" onClick={() => setOpen(!open)} ref={buttonRef} />
            </button>

            {/* PORTAL */}
            {open &&
                createPortal(
                    <Dropdown buttonRef={buttonRef} />,
                    document.body
                )}
        </div>
    );
}

function Dropdown({ buttonRef }) {

    const rect = buttonRef.current?.getBoundingClientRect();

    return (
        <div
            className="fixed z-9999 w-72 bg-[#232244] rounded-2xl p-4 text-white shadow-lg"
            style={{
                top: rect.bottom + 10,
                left: rect.left - 180,
            }}
        >

            <div className="mb-6">
                <div className="flex flex-col gap-2">
                    <button className="p-3 rounded-xl text-left hover:bg-[#34335B]">
                        Switch to Imperial
                    </button>
                </div>

                <p className="text-gray-400 mb-2">Temperature</p>

                <div className="flex flex-col gap-2">
                    <button className="p-3 rounded-xl text-left hover:bg-[#34335B]">
                        Celsius (°C)
                    </button>

                    <button className="p-3 rounded-xl text-left hover:bg-[#34335B]">
                        Fahrenheit (°F)
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-gray-400 mb-2">Wind Speed</p>

                <div className="flex flex-col gap-2">
                    <button onClick={() => { console.log("km/h selected") }} className="p-3 rounded-xl text-left hover:bg-[#34335B]">
                        km/h
                    </button>

                    <button className="p-3 rounded-xl text-left hover:bg-[#34335B]">
                        mph
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-gray-400 mb-2">Precipitation</p>

                <div className="flex flex-col gap-2">
                    <button onClick={() => { console.log("km/h selected") }} className="p-3 rounded-xl text-left hover:bg-[#34335B]">
                        milimiters (mm)
                    </button>

                    <button className="p-3 rounded-xl text-left hover:bg-[#34335B]">
                        inches (in)
                    </button>
                </div>
            </div>


        </div>
    );
}

export default UnitsMenu;