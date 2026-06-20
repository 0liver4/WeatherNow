import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

const defaultDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function DaysMenu({ days = defaultDays, selectedDay, onChange }) {

    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

    return (

        <div>
            {/* SELECT BUTTON */}
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className="bg-[#3e3d60] px-4 py-2 sm:px-6 sm:py-4 md:px-4 md:py-2 rounded-xl text-white flex items-center gap-2 focus:outline-none focus:ring-2 transition-all duration-200"
                type="button"
            >
                {selectedDay || "Select day"}
                <img
                    src={dropdownIcon}
                    alt="Dropdown Icon"
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* DROPDOWN */}
            {open &&
                createPortal(
                    <Dropdown
                        buttonRef={buttonRef}
                        days={days}
                        selectedDay={selectedDay}
                        onChange={(day) => {
                            onChange(day);
                            setOpen(false);
                        }}
                    />,
                    document.body
                )}
        </div>
    );
}

function Dropdown({ buttonRef, days, selectedDay, onChange }) {

    const rect = buttonRef.current?.getBoundingClientRect();

    return (
        <div
            className="fixed z-9999 w-72 bg-[#232244] rounded-2xl p-4 text-white shadow-lg"
            style={{ top: rect.bottom + 10, left: rect.left - 180 }}
        >
            <div className="flex flex-col gap-2">
                {days.map((day) => (
                    <button
                        key={day}
                        type="button"
                        onClick={() => onChange(day)}
                        className={`p-3 rounded-xl text-left transition-all duration-150 ${selectedDay === day ? "bg-[#34335B]" : "hover:bg-[#34335B]"}`}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DaysMenu;