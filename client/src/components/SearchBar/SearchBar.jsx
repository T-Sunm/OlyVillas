import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import './SearchBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen } from '../../store/slices/SearchSlice'
const SearchBar = () => {
  const dispatch = useDispatch()

  return (
    <>
      <div className='laptop:block phone:hidden'>
        <div className='SearchBar inline-flex p-[6px] border-[1px] border-[#c6c5c5] rounded-[30px] ease-in transition-all duration-100 '>
          <div className='flex place-items-center'>
            <div className='px-[16px]'>
              <span className='font-medium text-[14px]'>Anywhere</span>
            </div>
            <div className='flex place-items-center'>
              <span className='w-[1px] h-[24px] inline-block bg-[#dddd]'></span>
              <span className='px-[16px] font-medium text-[14px]'>Any week</span>
            </div>
            <div className=' flex place-items-center'>
              <span className='w-[1px] h-[24px] inline-block bg-[#dddd]'></span>
              <span className='px-[16px] text-[#717171] font-thin text-[14px]'>Add guests</span>
            </div>
            <div
              onClick={() => dispatch(setIsOpen(true))}
              className='rounded-full bg-[#FF385C] p-[10px]'>
              <BiSearch color='white' className='' />
            </div>
          </div>
        </div>
      </div>

      <div className='phone:block laptop:hidden w-full'>
        <div className='SearchBar w-[80%] p-[6px] border-[1px] border-[#c6c5c5] rounded-[30px] '>
          <div className='flex'>
            <div className=''>
              <div
                onClick={() => dispatch(setIsOpen(true))}
                className='rounded-full p-[10px]'>
                <BiSearch color='black' className='' size={20} />
              </div>
            </div>
            <div className='flex flex-col'>
              <div className=''>
                <span className='text-[14px] font-medium'>
                  Any where
                </span>
              </div>
              <div className='flex text-[12px] justify-between text-[#717171] gap-[5px]'>
                <div>
                  <span className=''>
                    Any week
                  </span>
                </div>
                <div className='flex '>
                  <span className='text-[0.75rem]'>
                    •
                  </span>
                </div>
                <div>
                  <span className=''>
                    Add guest
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar