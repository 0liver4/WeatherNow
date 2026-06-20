/*
  LittleInfoCard.jsx
  - Small reusable card used in the body to show a single metric
    (e.g., 'Feels like', 'Humidity', 'Wind', 'Precipitation').
  - Receives `title` and `info` as props and renders them.
*/
import React from 'react'

function LittleInfoCard({
    title,
    info
}) {

    return (

        <div className='flex w-40 h-30 flex-col justify-start items-top rounded-2xl border border-[#3a3a5e] bg-[#25253f]'>

            {/* MAIN CONTAINER */}
            <div className='pt-4 pl-4'>

                {/* TITLE */}
                <div className='font-DM-Sans opacity-80'>
                    {title}
                </div>

                {/* INFO: if info is empty show a placeholder */}
                <div className='font-extralight text-3xl mt-6'>
                    {!info ? "-" : info}
                </div>

            </div>

        </div>
    );
}

export default LittleInfoCard;