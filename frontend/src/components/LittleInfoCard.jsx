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

                {/* INFO */}
                <div className='font-extralight text-3xl mt-6'>
                    {info}
                </div>

            </div>

        </div>
    );
}

export default LittleInfoCard;