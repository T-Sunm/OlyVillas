import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { GrLanguage } from 'react-icons/gr'
import Profile from '../Profile/Profile'
import { Link, useNavigate } from 'react-router-dom'
import { GiSettingsKnobs } from 'react-icons/gi'
const NavigationProp = () => {

    return (
        <>
            <div className='phone:hidden laptop:block'>
                <div className='flex justify-between place-items-center px-[40px] h-[80px] relative ' >

                    <Link
                        to={"/all-properties"}>
                        <img src='./logo2.png' />
                    </Link>
                    <div>
                        <SearchBar />
                    </div>
                    <div className='flex justify-between place-items-center gap-2'>
                        <div className='
                hover:bg-[#f1eeee]
                p-[9px]
                rounded-[30px]
            '>
                            <span className='
                    font-semibold
                    text-[14px] 
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
            </div>

            <div className='phone:block laptop:hidden'>
                <div className='flex items-center px-[40px] h-[80px] relative  gap-2 '>
                    <SearchBar />
                    <div className='flex justify-between place-items-center gap-2'>
                        <div className=''>
                            <Profile />
                        </div>
                    </div>
                    <div
                        className='h-[40px] border-[1px] border-[#DDDDDD] rounded-full p-[12px] flex place-items-center '>
                        <div className='flex font-semibold place-items-center '>
                            <div><GiSettingsKnobs /></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavigationProp