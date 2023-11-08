import React, { useEffect, useState } from 'react'
import './MenuProfile.css'
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { setAuthModalTrue } from '../../store/slices/AuthSlice';

const MenuProfile = ({ isOpen, setToggle }) => {
  const dispatch = useDispatch()
  const menuProItems = [
    {
      title: "Sign up",
      font: "font-semibold",
      callBack: () => {
        setToggle(false)
        dispatch(setAuthModalTrue())
      }
    },
    {
      title: "Log in",
      callBack: () => {
        setToggle(false)
      }
    },
    {
      title: "",
    },
    {
      title: "Homyz your home",
      callBack: () => {
        setToggle(false)
      }
    },
    {
      title: "Help Center",
      callBack: () => {
        setToggle(false)
      }
    }
  ];
  const handleClick = (e, callBack) => {
    // e.stopPropagation để tránh chồng chất sự kiện
    // nếu bạn có một sự kiện được gắn vào một phần tử 
    //và một sự kiện khác được gắn vào một phần tử cha của phần tử đó, 
    //cả hai sự kiện sẽ được kích hoạt khi sự kiện trên phần tử con xảy ra, trừ khi bạn sử dụng stopPropagation()
    e.stopPropagation();
    callBack();

  }


  return (
    <div>
      {isOpen === true ? (
        <div className={`MenuProfile absolute right-4  w-auto h-auto rounded-[12px] py-[8px] mt-[34px] z-[11] bg-white `}>
          <OutsideClickHandler onOutsideClick={() => setToggle(false)}>
            <ul>
              {menuProItems.map((menuProItem, index) => (
                index !== 2 ? (
                  <li
                    // hàm handleClick này giúp mỗi khi nhấn vào là ẩn menuProfile đi
                    onClick={(e) => handleClick(e, menuProItem.callBack)}
                    key={index} className={`py-[12px] px-[16px] w-[240px] ${menuProItem.font}`}>
                    <div>
                      {menuProItem.title}
                    </div>
                  </li>
                ) : (
                  <div key={index} className='h-[1px] bg-[#c6c5c5]'></div>
                )
              ))}
            </ul>
          </OutsideClickHandler>
        </div>

      ) : null}
    </div>


  )
}

export default MenuProfile