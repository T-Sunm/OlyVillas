import React from 'react'
import { AmenetiesType } from '../../data/Amenities'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceAmeneties } from '../../store/slices/ProcessSlice'

const ProcessAmeneties = () => {

    const placeAmeneties = useSelector((state) => state.CreateProcess.placeAmeneties)
    const dispatch = useDispatch()
    const addAmentity = (name) => {
        // sao chép mảng ameneties và thêm ameniti vào cuối mảng
        dispatch(setPlaceAmeneties([...placeAmeneties, name]))
    }
    const removeAmentity = (name) => {
        const index = placeAmeneties.findIndex((amenitie) => amenitie === name)
        console.log(index)
        if (index !== -1) {
            const clonedAmenities = [...placeAmeneties]
            clonedAmenities.splice(index, 1)
            dispatch(setPlaceAmeneties(clonedAmenities))
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-[70vh]'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-4xl'>
                    Tell guests what your place has to offer
                </h2>
                <p>You can add more ameneties after you publish your listing</p>
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
                            <div className='grid grid-cols-3 gap-5 '>
                                {data.map((amenities) => (
                                    <button
                                        onClick={() => placeAmeneties.includes(amenities.name) ?
                                            removeAmentity(amenities.name) :
                                            addAmentity(amenities.name)}
                                        key={amenities.name} className={`flex flex-col justify-start border 
                                         rounded-md p-3 
                                        ${placeAmeneties.includes(amenities.name) ? "border-gray-950 bg-gray-50" : "border-gray-300"}
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