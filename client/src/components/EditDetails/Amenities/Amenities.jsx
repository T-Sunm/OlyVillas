import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
const Amenities = () => {

    const { propertyId } = useParams()

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
            <Link to={`/editresidency/${propertyId}/amenities`}>
                <div className='flex items-center gap-2' >
                    <span className='underline font-medium'>Edit</span>
                    <IoIosArrowForward />
                </div>
            </Link>
        </div>
    )
}

export default Amenities