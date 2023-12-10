import React from 'react'
import CardSettings from '../../components/CardSettings/CardSettings'
import PersonalInfo from '../../svg/Settings/PersonalInfo'
import LoginSecurity from '../../svg/Settings/LoginSecurity'

const AccountSetting = () => {

    const Settings = [
        {
            icon: <PersonalInfo />,
            title: "Personal info",
            description: "Provide personal details and how we can reach you",
            link: "/account-settings/personal-info"
        },
        {
            icon: <LoginSecurity />,
            title: "Personal info",
            description: "Update your password and secure your account",
            link: "/account-settings/login-and-security"
        }
    ]

    return (
        <div className='h-[100vh] w-[1080px] flex mx-auto  '>
            <div className=' flex flex-col w-full '>
                <div className='flex flex-col mt-[64px] mb-[56px] ml-[16px]'>
                    <h1 className='text-[32px] font-semibold'>
                        Account
                    </h1>
                    <div className='flex gap-1 mt-[8px] mb-[16px] text-[18px]'>
                        <span className=' font-semibold'>
                            Minh Trần Quang,
                        </span>
                        <span>
                            moonlig73@gmail.com
                        </span>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    {Settings.map(setting => (
                        <CardSettings icon={setting.icon} title={setting.title} description={setting.description} link={setting.link} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AccountSetting