import React from 'react'
import Name from '../../components/EditPersonalInfo/Legalname/Name'
import Email from '../../components/EditPersonalInfo/Email/Email'
import { useSelector } from 'react-redux'

const PersonalInfo = () => {
    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    return (
        <div className='h-[100vh] w-[1080px] flex mx-auto  '>
            <div className=' flex flex-col w-full '>
                <div className='flex flex-col mt-[64px] mb-[56px] ml-[16px]'>
                    <h1 className='text-[32px] font-semibold'>
                        Personal info
                    </h1>
                </div>
                {userInfo && (
                    <>
                        <Name firstName={userInfo.user.firstName} lastName={userInfo.user.lastName} />
                        <Email email={userInfo.user.email} />
                    </>
                )}
            </div>
        </div>
    )
}

export default PersonalInfo