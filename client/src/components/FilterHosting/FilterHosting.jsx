import React, { useState } from 'react'
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io'
import FilterHostings from '../../utils/FilterHosting'
import "./FilterHosting.css"

const FilterHosting = () => {

    const [itemFilter, setItemFilter] = useState("")
    return (
        <div className='flex items-start pb-[12px] pt-[4px] px-[24px] gap-3'>
            <div className=' pl-[12px] pr-[6px] rounded-full overflow-hidden bg-[#f7f7f7] border border-[#B0B0B0] focus-within:border-black '>
                <div className='flex items-center justify-center h-[32px] '>
                    <div>
                        <IoIosSearch />
                    </div>
                    <div className='ml-2 '>
                        <input placeholder='Search listings' className='border-none outline-none bg-transparent' />
                    </div>
                </div>
            </div>
            <div className='flex gap-3'>
                {FilterHostings.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => setItemFilter(item)}
                        className={`border-[0.5px] rounded-full px-[16px] ${itemFilter === item ? "border-black" : ""} itemFilter `}>
                        <div className='flex items-center justify-center gap-2 h-[32px]'>
                            <div className='text-[14px]'>
                                {item.title}
                            </div>
                            <IoIosArrowDown className='mt-[0.5px]' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterHosting