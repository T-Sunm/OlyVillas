import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Progress_Insights = () => {
    return (
        <div className='w-full h-full px-[80px]'>
            <div className='mt-[32px]'>
                <div className='flex justify-start items-center gap-3 text-[14px] text-[#717171] font-semibold border-b mb-[50px]'>
                    <Link to={"/hosting/insights/earnings"}>
                        <div className='hover:bg-gray-100 p-[10px] rounded-lg my-[6px]'>
                            Earnings
                        </div>
                    </Link>
                    <Link to={"/hosting/insights/earnings"}>
                        <div className='hover:bg-gray-100 p-[10px] rounded-lg my-[6px]'>
                            Opportunities
                        </div>
                    </Link>
                    <Link to={"/hosting/insights/reviews"}>
                        <div className='hover:bg-gray-100 p-[10px] rounded-lg my-[6px]'>
                            Reviews
                        </div>
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Progress_Insights