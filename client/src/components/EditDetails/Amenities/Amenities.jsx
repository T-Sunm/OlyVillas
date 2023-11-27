import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
const Amenities = () => {
    return (
        <div className='flex justify-between border-b-[0.5px] pb-[48px] mb-[48px] mt-[48px]'>
            <div className='flex flex-col'>
                <span className='text-[18px] font-semibold'>
                    Amenities
                </span>
                <span className='text-[#888888] text-[14px] mt-[4px]'>
                    Breakfast
                </span>
            </div>
            <div className='flex items-center gap-2' onClick={() => setToggle(true)}>
                <span className='underline font-medium'>Edit</span>
                <IoIosArrowForward />
            </div>
        </div>
    )
}

export default Amenities