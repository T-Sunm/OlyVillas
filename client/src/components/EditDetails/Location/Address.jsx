import React, { useState } from 'react'
import FormAddress from './FormAddress'
import { useSelector } from 'react-redux'

const Address = () => {

    const [toggle, setToggle] = useState(false)

    const OriMapData = useSelector((state) => state.EditProp.mapData)

    return (
        <>
            <div className=' flex flex-col gap-5 mb-[32px]'>
                <span className='text-[18px] font-semibold mb-[10px]'>
                    Location
                </span>
                <div className='flex justify-between border-b-[0.5px] pb-[24px] mb-[24px]'>
                    <div className='flex flex-col'>
                        <span className='text-[16px]'>
                            Address
                        </span>
                        <span className='text-[#888888] text-[14px] mt-[4px]'>
                            {`${OriMapData.street_address}`}  {OriMapData.address_extra !== "" && `(${OriMapData.address_extra})`}, {`${OriMapData.locality}, ${OriMapData.place} ${OriMapData.postcode}, ${OriMapData.country}`}
                        </span>
                    </div>
                    <div onClick={() => setToggle(true)}>
                        <span className='underline font-medium'>Edit</span>
                    </div>
                </div>
            </div>
            {toggle && (
                <FormAddress toggle={toggle} setToggle={setToggle} />
            )}
        </>
    )
}

export default Address