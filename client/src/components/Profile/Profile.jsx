import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import './profile.css'

import { useSelector } from 'react-redux'
import MenuProfile from '../MenuProfile/MenuProfile'

const Profile = ({ toggleHamber = true }) => {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const [toggle, setToggle] = useState(false)

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
        onClick={(e) => handleMenuToggle(e)}
        className='profile 
        h-[48px] rounded-full flex items-center gap-2 border-[1px] border-[#c6c5c5] p-1
        ease-in transition-all duration-100 text-black
      '>
        {toggleHamber && (
          <div>
            <AiOutlineMenu />
          </div>
        )}
        <div className=''>
          {userInfo ? (
            <span className='flex justify-center items-center bg-black text-white h-9 w-9 text-sm rounded-full'>
              {/* hàm shift lấy phần tử đầu tiên trong mảng */}
              {userInfo.user?.firstName?.split("").shift().toUpperCase()}
            </span>
          ) : (
            <CgProfile />
          )}

        </div>
      </div>
      <div>
        <MenuProfile isOpen={isOpen} setToggle={setToggle} />
      </div>
    </>
  )
}

export default Profile