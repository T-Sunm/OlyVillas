import React from 'react'
import ListingTitle from './ListingTitle/ListingTitle'
import ListingDes from './ListingDescription/ListingDes'
import NumOfGuest from './NumOfGuest/NumOfGuest'

const ListingBasic = () => {
    return (
        <div className='mt-[48px] flex flex-col '>
            <span className='text-[18px] font-semibold mb-[30px]'>
                Listing basics
            </span>
            <ListingTitle />
            <ListingDes />
            <NumOfGuest />
        </div>
    )
}

export default ListingBasic