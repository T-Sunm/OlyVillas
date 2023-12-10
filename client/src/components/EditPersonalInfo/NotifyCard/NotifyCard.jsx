import React from 'react'
import Secure from '../../../svg/Settings/Secure'

const NotifyCard = () => {
    return (
        <div className='px-[24px] border'>
            <div className='my-[32px] flex flex-col gap-4 justify-start items-start'>
                <Secure />
                <div className='text-[18px] font-semibold text-[#484848]'>
                    <span>
                        Let's make your account more secure
                    </span>
                </div>
                <div>
                    <span className='text-[16px] font-semibold text-[#484848]'>
                        Your account security:
                    </span>
                    <span className='text-[16px] font-semibold text-[#767676]'>
                        Low
                    </span>
                </div>
                <div className='text-[16px] text-[#767676]'>
                    We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.
                </div>
                <div className='w-[48px] h-[0.5px] bg-[#d4c8c8]'></div>
                <button className='py-[10px] px-[22px] bg-[#008489] text-white rounded-[4px]'>
                    Improve
                </button>
            </div>

        </div>
    )
}

export default NotifyCard