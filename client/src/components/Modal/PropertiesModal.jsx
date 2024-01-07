import React from 'react'
import { GoX } from 'react-icons/go'
import { FaHome } from "react-icons/fa";
const PropertiesModal = ({ data, setToggle, onAction }) => {
    return (
        <div className='relative z-50'>
            <div className='fixed inset-0 bg-gray-300 opacity-75'></div>
            <div className='fixed inset-0 z-10 overscroll-y-auto no-scrollbar'>
                <div className='flex h-full justify-center items-center '>
                    <div className='bg-white flex flex-col w-[750px] h-[90%] rounded-[12px] pb-[20px] '>
                        <div
                            onClick={() => setToggle(false)}
                            className='flex items-center basis-[10%]  sticky top-0 w-full px-[24px] '>
                            <GoX size={23} className='' />
                        </div>
                        <div className='overflow-y-auto '>
                            <div className='px-[24px] '>
                                <span className='text-[22px] font-medium '>
                                    Select a listings
                                </span>
                            </div>
                            <div className=''>
                                <div className='flex flex-col px-[24px] gap-3'>
                                    <div onClick={() => onAction(0)} className='flex w-full items-center gap-5'>
                                        <FaHome size={42} />
                                        <span className='truncate'>All listings</span>
                                    </div>
                                    {data.map((item) => (
                                        <div onClick={() => onAction(item?.id, item?.title)} className='flex w-full items-center gap-5'>
                                            <img className='w-[52px] rounded-md' src={item?.photos[0]?.url} />
                                            <span className='truncate'>{item?.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertiesModal