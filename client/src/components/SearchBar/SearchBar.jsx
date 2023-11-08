import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import './SearchBar.css'
const SearchBar = () => {
    return (
      <div className='SearchBar inline-flex p-[8px] border-[1px] border-[#c6c5c5] rounded-[30px] ease-in transition-all duration-100'>
        <div className='flex place-items-center'>
            <div className='px-[16px]'> 
            <span className='font-medium'>Anywhere</span>
            </div>
            <div className='flex place-items-center'>
            <span className='w-[1px] h-[24px] inline-block bg-[#dddd]'></span>
            <span className='px-[16px] font-medium'>Any week</span>
            </div>
          <div className=' flex place-items-center'>
            <span className='w-[1px] h-[24px] inline-block bg-[#dddd]'></span>
            <span className='px-[16px] text-[#717171] font-thin'>Add guests</span>
          </div>
          <div className='rounded-full bg-[#FF385C] p-[10px]'>
              <BiSearch color='white' className=''/>
          </div>
    </div>  
      </div>
    
  )
}

export default SearchBar