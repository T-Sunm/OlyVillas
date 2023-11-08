import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {GrLanguage} from 'react-icons/gr'
import Profile from '../Profile/Profile'
const NavigationProp = () => {
  return (
    <>
    <div className='flex justify-between place-items-center px-[40px] h-[80px] relative'>
        <div>
            <img src='./logo2.png'/>
        </div>
        <div>
            <SearchBar/>
        </div>
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
                <GrLanguage/>
            </div>
            <div className=''>
                <Profile/>  
            </div>      
        </div>
        </div>
    </>
  )
}

export default NavigationProp