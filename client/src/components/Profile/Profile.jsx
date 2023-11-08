import React, { useEffect, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import './profile.css'
import MenuProfile from '../menuProfile/menuProfile'

const Profile = () => {

  const [toggle , setToggle] = useState(false)

  // gắn cờ isOpen để theo dõi toggle vì có sử dụng setToggle 
  // trong OutsideClickHandler làm onClick lớp parent không xài được
   const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(toggle);
  }, [toggle]);

  const handleMenuToggle = (e) => {
    setToggle(!isOpen);
  };

  return (
    <>
    <div 
    onClick={(e)=>handleMenuToggle(e)}
    className='profile 
    h-[48px] rounded-[30px] flex items-center border-[1px] border-[#c6c5c5] py-[8px] pr-[8px] pl-[14px]
    ease-in transition-all duration-100
    '>
        <div>
            <AiOutlineMenu/>
        </div>
        <div className='ml-[14px]'>
            <CgProfile size={24}/>
        </div>
    </div>
    <div>
      <MenuProfile isOpen={isOpen} setToggle={setToggle}/>
    </div>
    </>
  )
}

export default Profile