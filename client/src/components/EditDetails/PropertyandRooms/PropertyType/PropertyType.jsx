import React, { useState } from 'react'
import DetailsPropanRoom from './DetailsPoprerty'
import { useSelector } from 'react-redux'
import { ListingType } from '../../../../utils/EditPropertyType'

const PropertyType = () => {

    const [toggleEdit, setToggleEdit] = useState(false)
    const { locationType, placeType } = useSelector(state => state.EditProp)

    return (
        <>
            {toggleEdit === false ? (
                <div className='flex justify-between items-start pb-[24px] mb-[24px] border-b-[0.5px]'>
                    <div className='flex flex-col'>
                        <span className='text-[16px] font-light mb-[2px]'>
                            Property type
                        </span>
                        <div className='flex flex-col text-[14px] text-[#717171]'>
                            <span>
                                {locationType.name}
                            </span>
                            <span>
                                Listing type: {ListingType.find(item => item.id === placeType.id).name}
                            </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setToggleEdit(true)}
                        className='underline font-medium' >
                        Edit
                    </div>
                </div>
            ) : (
                <DetailsPropanRoom setToggleEdit={setToggleEdit} />
            )}
        </>
    )
}

export default PropertyType