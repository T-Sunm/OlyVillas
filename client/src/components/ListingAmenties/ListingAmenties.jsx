import React, { useEffect, useMemo, useState } from 'react'
import { SvgAllAmenities } from '../../data/allAmenities'
import ListingAmenitiesDetails from './ListingAmenitiesDetails'


const ListingAmenties = ({ amenties }) => {

    console.log(amenties)

    const [toggle, setToggle] = useState(false)

    const getSvgPathByName = (name) => {
        const amenity = SvgAllAmenities.find(item => item.name === name);
        return amenity ? amenity.svgPath : null;
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
        <div>
            <div className='flex flex-col justify-start items-start gap-2 py-[48px] border-t-[0.5px]'>
                <h4 className='text-xl font-medium pb-[24px]'>
                    What this place offers
                </h4>
                <div className='grid grid-cols-2 w-full'>
                    {amenties && allAmenities.slice(0, 10).map(amenties => (
                        <div className='flex items-center'>
                            <div>{getSvgPathByName(amenties)}</div>
                            {amenties}
                        </div>
                    ))}
                </div>
                {allAmenities.length > 10 && (
                    <button onClick={() => setToggle(true)} className='py-[13px] px-[23px] border border-black mt-[24px] rounded-lg font-semibold '>
                        Show all {allAmenities.length} ameneties
                    </button>
                )}

            </div>
            {toggle && allAmenities.length > 10 && (
                <ListingAmenitiesDetails amenties={amenties} setToggle={setToggle} />
            )}
        </div>
    )
}

export default ListingAmenties