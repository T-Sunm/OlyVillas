import React from 'react'
import { AmenetiesType } from '../../data/Amenities'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceAmeneties } from '../../store/slices/ProcessSlice'
import "./style.css"
const ProcessAmeneties = () => {

    const placeAmeneties = useSelector((state) => state.CreateProcess.placeAmeneties)
    console.log(placeAmeneties)
    const dispatch = useDispatch()

    const addAmentity = (name, group) => {
        const updatedAmenities = [...placeAmeneties[group], name];
        dispatch(setPlaceAmeneties({ ...placeAmeneties, [group]: updatedAmenities }));
    }
    const removeAmentity = (name, group) => {
        const filteredAmenities = placeAmeneties[group].filter(amenitie => amenitie !== name);
        dispatch(setPlaceAmeneties({ ...placeAmeneties, [group]: filteredAmenities }));
    }
    return (
        <div className='flex flex-col items-center justify-center h-[70vh]'>
            <div className='flex flex-col gap-3 phone:px-3 '>
                <h2 className='font-semibold laptop:text-[32px] phone:text-[26px]'>
                    Tell guests what your place has to offer
                </h2>
                <p className='text-[#717171]'>You can add more ameneties after you publish your listing</p>
            </div>
            <div className='flex flex-col gap-4 max-h-[65vh] overflow-auto no-scrollbar py-4'>
                {
                    AmenetiesType.map(({ type, data }, i) => (
                        <div key={i} className='flex flex-col gap-5'>
                            {type === "advanced" && (
                                <span className='text-lg font-medium'>
                                    Do you have any standout amenities?
                                </span>
                            )}
                            {type === "safety" && (
                                <span className='text-lg font-medium'>
                                    Do you have any safety items?
                                </span>
                            )}
                            <div className='grid tablet:grid-cols-3 phone:grid-cols-2 phone:px-3 gap-5 '>
                                {data.map((amenities) => (
                                    <button
                                        onClick={() => placeAmeneties[amenities.group].includes(amenities.name) ?
                                            removeAmentity(amenities.name, amenities.group) :
                                            addAmentity(amenities.name, amenities.group)}
                                        key={amenities.name} className={` flex flex-col justify-start border 
                                         rounded-md p-3 
                                        ${placeAmeneties[amenities.group].includes(amenities.name) ? "border-gray-950 bg-gray-50" : "border-gray-300 "}
                                        hover:border-gray-950 transition-all duration-300`}>
                                        {amenities.svgPath}
                                        <span className='text-airbnb-light-black font-medium'>
                                            {amenities.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProcessAmeneties