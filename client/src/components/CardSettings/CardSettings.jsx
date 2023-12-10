import React from 'react'
import './CardSettings.css'
import PersonalInfo from '../../svg/Settings/PersonalInfo'
import { Link } from 'react-router-dom'
const CardSettings = ({ icon, title, description, link }) => {
    return (
        <Link to={link}>
            <div className='CardSetting p-[16px] rounded-lg'>
                <div className='mb-[16px]'>
                    {icon}
                </div>
                <div>
                    <div className='mb-[8px]'>
                        <span className='text-[16px] font-semibold'>
                            {title}
                        </span>
                    </div>
                    <span className='text-[14px] text-[#717171]'>
                        {description}
                    </span>
                </div>
            </div>
        </Link>

    )
}

export default CardSettings