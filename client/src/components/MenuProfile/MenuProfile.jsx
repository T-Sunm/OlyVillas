import React, { useEffect, useState } from 'react'
import './MenuProfile.css'
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalFalse, setAuthModalTrue, setToggleModal, setUserInfo } from '../../store/slices/AuthSlice';
import { Link, redirect, useNavigate } from 'react-router-dom';

const MenuProfile = ({ isOpen, setToggle }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.auth.userInfo)

  const menuProItemsAuthenticated = [
    {
      title: "Profile",
      font: "font-semibold",
      Link: "/account-settings",
      callBack: () => {
        setToggle(false)
      }
    },
    {
      title: "Whishlists",
      font: "font-semibold",
      Link: "/whishlists",
      callBack: () => {
        setToggle(false)
      }
    },
    {
      title: "Trips",
      font: "font-semibold",
      Link: "/reservations",
      callBack: () => {
        setToggle(false)

      }
    },
    {
      title: "Manage Listings",
      Link: "/hosting",
      callBack: () => {
        setToggle(false)
        dispatch(setAuthModalFalse())
      }
    },
    {
      title: "",
    },
    {
      title: "Log out ",
      callBack: () => {
        setToggle(false)
        navigate('/all-properties')
        localStorage.clear()
        dispatch(setAuthModalFalse())
        dispatch(setUserInfo(null))
      }
    },
    {
      title: "Help Center",
      callBack: () => {
        setToggle(false)
      }
    }
  ];
  const menuProItemsNotAuthenticated = [
    {
      title: "Sign up",
      font: "font-semibold",
      callBack: () => {
        setToggle(false)
        dispatch(setToggleModal(true))
      }
    },
    {
      title: "Log in",
      callBack: () => {
        setToggle(false)
        dispatch(setToggleModal(true))
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
        <div className={`MenuProfile absolute right-4  w-auto h-auto rounded-[12px] py-[8px] mt-[34px] z-[11] bg-white text-black `}>
          <OutsideClickHandler onOutsideClick={() => setToggle(false)}>
            {userInfo ? (
              <ul>
                {menuProItemsAuthenticated.map((menuProItem, index) => (
                  index !== 4 ? (
                    <li className={`py-[12px] px-[16px] w-[240px] ${menuProItem.font}`}>
                      <Link
                        to={menuProItem?.Link}
                        // hàm handleClick này giúp mỗi khi nhấn vào là ẩn menuProfile đi
                        onClick={(e) => handleClick(e, menuProItem.callBack)}
                        key={index} >
                        <div className=''>
                          {menuProItem.title}
                        </div>
                      </Link>
                    </li>

                  ) : (
                    <div key={index} className='h-[1px] bg-[#c6c5c5]'></div>
                  )
                ))}
              </ul>
            ) : (
              <ul>
                {menuProItemsNotAuthenticated.map((menuProItem, index) => (
                  index !== 3 ? (
                    <li
                      // hàm handleClick này giúp mỗi khi nhấn vào là ẩn menuProfile đi
                      onClick={(e) => handleClick(e, menuProItem.callBack)}
                      key={index} className={`py-[12px] px-[16px] w-[240px] ${menuProItem.font}`}>
                      <div className={menuProItem?.font}>
                        {menuProItem.title}
                      </div>
                    </li>
                  ) : (
                    <div key={index} className='h-[1px] bg-[#c6c5c5]'></div>
                  )
                ))}
              </ul>
            )}
          </OutsideClickHandler>
        </div>

      ) : null}
    </div>


  )
}

export default MenuProfile