import React, { useEffect, useMemo } from 'react'
import { AmenetiesType } from '../../data/Amenities'

const ListingAmenties = ({ amenties }) => {

    console.log(amenties)

    const getSvgPathByName = (name) => {
        for (const amenity of AmenetiesType) {
            for (const data of amenity.data) {
                if (data.name === name) {
                    return data.svgPath
                }
            }
        }
        return null
    }

    const getAmenities = (obj) => {
        const resultArray = [];

        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                const arr = obj[key];
                resultArray.push(...arr);
            }
        }

        return resultArray;
    }

    const allAmenities = getAmenities(amenties)


    console.log(allAmenities)

    return (
        <div className='flex flex-col gap-2'>
            <h4 className='text-xl font-semibold'>
                What this place offers
            </h4>
            <div className='grid grid-cols-2'>
                {amenties && allAmenities.splice(0, 10).map(amenties => (
                    <div>
                        {amenties}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListingAmenties