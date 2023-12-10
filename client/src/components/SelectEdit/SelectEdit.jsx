import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import './Select-Edit.css'
const SelectEdit = ({ toggle, setToggle, ListlistingType, ListpropertyType, ListplaceOptions, pickPlaceHdl, pickPropType, pickListType, title, placeOptions, propertyType, listingType }) => {

    return (
        <div
            onClick={() => toggle === '' ? setToggle(title) : setToggle('')}
            className='mt-[24px] w-[600px]'>
            <span>{title}</span>
            <div className='border border-[#b0b0b0] rounded-lg overflow-hidden w-[98%] outline-none mt-[2px] cursor-pointer'>
                <div className='my-[18px] mx-[12px] flex justify-between items-center'>
                    <span>{placeOptions} {propertyType} {listingType}</span>
                    <IoIosArrowDown />
                </div>
            </div>
            {toggle === title && (
                <div className='dropdown-list w-[98%] outline-none mt-[8px] rounded-lg overflow-hidden'>
                    {ListplaceOptions && ListplaceOptions.map((item) => (
                        <div
                            onClick={() => pickPlaceHdl(item?.id)}
                            className='text-[15px] font-extralight hover:bg-slate-500 hover:text-white '>
                            <span className='my-[5px] mx-[12px]'>{item.name}</span>
                        </div>
                    ))}
                    {ListpropertyType && ListpropertyType.map((item) => (
                        <div
                            onClick={() => pickPropType(item?.id)}
                            className='text-[15px] font-extralight hover:bg-slate-500 hover:text-white '>
                            <span className='my-[5px] mx-[12px]'>{item.name}</span>
                        </div>
                    ))}
                    {ListlistingType && ListlistingType.map((item) => (
                        <div
                            onClick={() => pickListType(item?.id)}
                            className='text-[15px] font-extralight hover:bg-slate-500 hover:text-white '>
                            <span className='my-[5px] mx-[12px]'>{item.name}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default SelectEdit
