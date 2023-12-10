import React from 'react'
import Passwords from '../../../components/EditPersonalInfo/Password/Passwords'
import { useSelector } from 'react-redux'
import Secure from '../../../svg/Settings/Secure'
import NotifyCard from '../../../components/EditPersonalInfo/NotifyCard/NotifyCard'

const Login = () => {

    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    return (
        <div className='flex '>
            <div className='flex flex-col  w-[58.333333333333336%]'>
                <h3 className='text-[24px] font-semibold pt-[32px] pb-[24px]'>
                    Login
                </h3>
                <Passwords updatedAt={userInfo.user.updatedAt} email={userInfo.user.email} />
            </div>
            <div className='w-[33.33333333333333%] ml-[8.33333333333333%] mt-2'>
                <NotifyCard />
            </div>
        </div>
    )
}

export default Login