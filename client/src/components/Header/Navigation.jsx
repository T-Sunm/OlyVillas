import React, { useEffect } from 'react'
import { GrLanguage } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import Profile from '../Profile/Profile'

const Navigation = () => {

    return (
        <>
            <div className='flex justify-between place-items-center px-[40px] h-[80px] relative'>

                <Link to={"/all-properties"}>
                    <img src='./logo2.png' />
                </Link>
                <div className='flex justify-between place-items-center gap-2'>
                    <div className='
                hover:bg-[#f1eeee]
                p-[12px]
                rounded-[30px]
            '>
                        <span className='
                    font-semibold 
                    '>
                            Homyz your home
                        </span>
                    </div>
                    <div className='flex place-items-center rounded-full hover:bg-[#f1eeee] p-[15px]'>
                        <GrLanguage />
                    </div>
                    <div className=''>
                        <Profile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation