import React from 'react'
import Profile from '../Profile/Profile'
import { PiBellSimpleRinging } from "react-icons/pi";
import { Link } from 'react-router-dom';
const Headerhosting = () => {

    const menu = [
        {
            Link: "/hosting",
            title: "Today"
        },
        {
            Link: "/hosting/listings",
            title: "Listings"
        },
        {
            Link: "/createResidency",
            title: "Create a new listings"
        },
        {
            Link: "/hosting/insights/earnings",
            title: "Insights"
        }
    ]

    return (
        <>
            <div className='flex justify-between place-items-center px-[40px] h-[80px] relative bg-white'>

                <Link to={"/all-properties"}>
                    <img src='./logo2.png' />
                </Link>
                <div className='flex  place-items-center gap-2'>
                    {menu.map(item => (
                        <Link to={item?.Link}>
                            <div className='px-[16px] py-[10px] text-[14px] font-semibold text-[#717171]'>
                                {item.title}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='flex justify-between place-items-center gap-2'>
                    <div
                        className='hover:bg-[#f1eeee]
                                p-[12px]
                                rounded-[30px]
                    '>
                    </div>
                    <div className='rounded-full flex items-center gap-2 border-[1px] border-[#c6c5c5] p-3 text-black '>
                        <PiBellSimpleRinging size={20} />
                    </div>
                    <div className=''>
                        <Profile toggleHamber={false} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Headerhosting