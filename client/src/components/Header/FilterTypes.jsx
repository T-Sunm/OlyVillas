import React, { useRef, useState } from 'react'
import { iconBnbs } from '../../utils/iconBnb.jsx'
import './FilterType.css'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import useDragScroll from '../../hooks/useDraggleTabox'
import { filter } from '../../Icon_BnB_svg'
import { GiSettingsKnobs } from 'react-icons/gi'
import TyniHome from '../../Icon_BnB_svg/Tinyhomes.svg'
const FilterTypes = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const iconFiltersRef = useDragScroll()
  const arrowLeft = useRef();
  const arrowRight = useRef()
  let scrollVal = 0
  // khi lướt qua hết icon ở phía nào thì arrow phía đó sẽ ẩn 
  const handleIcons = () => {
    scrollVal = Math.ceil(iconFiltersRef.current.scrollLeft);
    let maxScrollableWidth = iconFiltersRef.current.scrollWidth - iconFiltersRef.current.clientWidth
    arrowLeft.current.style.display = scrollVal > 0 ? "flex" : "none"
    arrowRight.current.style.display = maxScrollableWidth > scrollVal ? "flex" : "none"
  }

  const scrollLeft = () => {
    iconFiltersRef.current.scrollLeft += -250
    setTimeout(() => handleIcons(), 50)
  }
  const scrollRight = () => {
    iconFiltersRef.current.scrollLeft += 250
    setTimeout(() => handleIcons(), 50)
  }



  return (
    < div className='flex gap-[50px] place-items-center mx-auto'>
      <div className='wrap-content relative laptop:w-[80vw] phone:w-[100vw]'>
        <div
          ref={arrowLeft}
          onClick={() => scrollLeft()}
          className='absolute w-[26px] h-[26px] top-[30%] left-4 z-10 border-[0.5px] justify-center place-items-center border-[black]/30 rounded-full ' style={{ display: "none" }}>
          <IoIosArrowBack />
        </div>
        <div className=' overflow-y-hidden no-scrollbar mt-3 ml-[30px] relative' id='filterType' ref={iconFiltersRef} >
          <div className='flex gap-[40px] h-full'>
            {iconBnbs.map((iconBnb, index) => (
              <div
                onClick={() => setSelectedIcon(index)}
                key={index}
                className={`iconFilter flex flex-col items-center justify-between h-15 cursor-pointer p-[10px] rounded-[10px] `}>
                {iconBnb.icon}
                <div className={`text-[12px] font-medium break-keep whitespace-nowrap ${selectedIcon === index ? "iconFilterActive " : ""}`}>
                  {iconBnb.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={arrowRight}
          onClick={() => scrollRight()}
          className='absolute w-[26px] h-[26px] top-[30%] laptop:right-0 phone:right-4 z-10 border-[0.5px] flex justify-center place-items-center border-[black]/30 rounded-full'>
          <IoIosArrowForward />
        </div>
      </div>
      <div className='phone:hidden laptop:block'>
        <div
          className='w-[20vm] h-[60px] border-[1px] border-[#DDDDDD] rounded-[12px] py-[7px] flex place-items-center '>
          <div className='flex font-semibold items-center justify-center px-[16px] gap-[8px]'>
            <div><GiSettingsKnobs /></div>
            <div className='text-[14px]'>Filters</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FilterTypes