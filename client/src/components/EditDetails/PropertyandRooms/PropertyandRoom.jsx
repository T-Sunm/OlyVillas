import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ListingType } from '../../../utils/EditPropertyType'
import PropertyType from './PropertyType/PropertyType'
import Room from './RoomsAndSpace/Room'

const PropertyandRoom = () => {


    return (
        <>
            <div className=''>
                <div className='mb-[24px]'>
                    <span className='text-[18px] font-semibold'>
                        Property and rooms
                    </span>
                </div>
                <PropertyType />
                <Room />
            </div>

        </>

    )
}

export default PropertyandRoom