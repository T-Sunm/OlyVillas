import { format } from 'date-fns';
import React, { useMemo } from 'react'
import { GoX } from 'react-icons/go'
import { IoIosArrowForward } from "react-icons/io";

const ReservationDetails = ({ data, setToggle }) => {


    const reverDateStart = useMemo(() => {
        if (!data) {
            return null;
        }

        const start = new Date(data.startDate)

        return `${format(start, 'EEE, MMMM dd, yyyy')} `;
    }, [data])

    const reverDateEnd = useMemo(() => {
        if (!data) {
            return null;
        }

        const end = new Date(data.endDate)

        return `${format(end, 'EEE, MMMM dd, yyyy')}`;
    }, [data])

    console.log(data)
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
                                    Reservation request
                                </span>
                            </div>
                            <div className=''>
                                <div className='px-[24px]'>
                                    <img src={data?.Residency?.photos?.[0]?.url} className='w-full' />
                                    <div>
                                        <div className='font-semibold'>
                                            {data?.Residency?.title}
                                        </div>
                                        <ul className='flex gap-2'>
                                            <li>
                                                Adults: {data?.tripInfo?.Adults}
                                            </li>
                                            <li>
                                                Children: {data?.tripInfo?.Children}
                                            </li>
                                            <li>
                                                Infants: {data?.tripInfo?.Infants}
                                            </li>
                                            <li className='font-semibold ml-3'>
                                                You would pay : ${data?.price}
                                            </li>
                                        </ul>

                                    </div>
                                    <div className='flex border-b border-t p-[35px] justify-between items-center'>
                                        <div>
                                            <div className='text-xs font-semibold'>
                                                Check-in
                                            </div>
                                            <div className='font-semibold text-xl'>
                                                {reverDateStart}
                                            </div>
                                        </div>
                                        <div>
                                            <IoIosArrowForward />
                                        </div>
                                        <div>
                                            <div className='text-xs font-semibold'>
                                                Checkout
                                            </div>
                                            <div className='font-semibold text-xl'>
                                                {reverDateEnd}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationDetails