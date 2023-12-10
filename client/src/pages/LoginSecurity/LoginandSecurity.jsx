import React from 'react'
import Passwords from '../../components/EditPersonalInfo/Password/Passwords'
import { Link, Outlet } from 'react-router-dom'

const LoginandSecurity = () => {
    return (
        <div className='h-[100vh] w-[1080px] flex mx-auto  '>
            <div className=' flex flex-col w-full '>
                <div className='flex flex-col mt-[64px] mb-[56px] ml-[16px]'>
                    <h1 className='text-[32px] font-semibold'>
                        Login & security
                    </h1>
                </div>
                <div className='flex gap-6 border-b-[0.5px] py-[16px]'>
                    <Link >
                        <div className='text-[#414141] text-[14px] font-semibold'>
                            LOGIN
                        </div>
                    </Link>
                    <Link to={'/account-settings/login-and-security/login-requests'}>
                        <div className='text-[#414141] text-[14px] font-semibold'>
                            LOGIN REQUESTS
                        </div>
                    </Link>
                    <div className='text-[#414141] text-[14px] font-semibold'>
                        SHARED ACCESS
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default LoginandSecurity