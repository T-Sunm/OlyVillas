import React from 'react'
import { GoX } from "react-icons/go";
import data from '../../utils/EditAmenities';
import { SvgAllAmenities } from '../../data/allAmenities'
const ListingAmenitiesDetails = ({ amenties, setToggle }) => {

    function getTitleByKey(data, searchKey) {
        for (let item of data) {
            if (item.key === searchKey) {
                return item.title;
            }
        }
        return null;
    }

    const getSvgPathByName = (name) => {
        const amenity = SvgAllAmenities.find(item => item.name === name);
        return amenity ? amenity.svgPath : null;
    }
    return (
        <div className='relative z-50'>
            <div className='fixed inset-0 bg-gray-300 opacity-75'></div>
            <div className='fixed inset-0 z-10 overscroll-y-auto no-scrollbar'>
                <div className='flex h-full justify-center items-center '>
                    <div className='bg-white flex flex-col w-[750px] h-[90%] rounded-[12px] pb-[20px] '>
                        <div
                            onClick={() => setToggle(false)}
                            className='flex items-center basis-[35%]  sticky top-0 w-full px-[24px] '>
                            <GoX size={23} className='' />
                        </div>
                        <div className='overflow-y-auto '>
                            <div className='px-[24px] '>
                                <span className='text-[22px] font-medium '>
                                    What this place offers
                                </span>
                            </div>
                            <div className=''>
                                <div className='px-[24px]'>
                                    {Object.keys(amenties)
                                        .filter(keyAmenities => amenties[keyAmenities].length > 0)
                                        .map(keyAmenities => (
                                            <div key={keyAmenities} className='flex flex-col pb-[10px]'>
                                                <div className='py-[16px]'>
                                                    <span className='text-[18px] font-medium'>
                                                        {getTitleByKey(data, keyAmenities)}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    {amenties[keyAmenities].map((amentie, index) => (
                                                        <div key={index} className='flex items-center py-[24px] border-b-[1px]'>
                                                            {getSvgPathByName(amentie)}
                                                            {amentie}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListingAmenitiesDetails