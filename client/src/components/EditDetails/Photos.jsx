import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import hero_sliders from '../../utils/Slide_hero';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
const Photos = () => {
    const photos = useSelector((state) => state.EditProp.photos)
    const { propertyId } = useParams()
    return (
        <div className='relative w-full mb-[48px]'>
            <div className='flex justify-between items-center'>
                <span className='text-[18px] font-semibold'>
                    Photos
                </span>
                <Link to={`/editresidency/${propertyId}/photos`}>
                    <span className='flex items-center'>
                        <span className='underline font-medium'>Edit</span>
                        <IoIosArrowForward />
                    </span>
                </Link>
            </div>
            <div className='overflow-x-auto overflow-y-hidden no-scrollbar relative mt-2 '>
                <div className='grid grid-flow-col gap-2 '>
                    {photos && photos.map((photo, i) => (
                        <div key={i} className='rounded-lg overflow-hidden w-[210px]'>
                            <img src={photo.url} className='w-[210px] h-[140px] ' alt={`Image ${i}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Photos