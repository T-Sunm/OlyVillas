import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceSpace } from '../../store/slices/ProcessSlice'

const FloorPlan = () => {
    const placeSpace = useSelector((state) => state.CreateProcess.placeSpace)
    const dispatch = useDispatch()
    const handleIncrement = (type) => {
        // ngoặc vuông dùng để truy cập property của Obj
        dispatch(setPlaceSpace({ ...placeSpace, [type]: placeSpace[type] + 1 }))
    }
    const handleDecrement = (type) => {
        // ngoặc vuông dùng để truy cập property của Obj
        dispatch(setPlaceSpace({ ...placeSpace, [type]: placeSpace[type] - 1 }))
    }
    return (
        <div className='flex flex-col justify-center items-center gap-5 w-full h-[70vh] '>
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-4xl'>Share some basics about your place</h2>
                <p>
                    You'll add more details later ,such as bed types
                </p>
            </div>
            <div className='flex flex-col w-[40%] gap-5'>
                {Object.keys(placeSpace).map((place, i) => (
                    <div key={i} className='flex justify-between w-full text-lg items-center'>
                        <span className='capitalize'>{place}</span>
                        <div className='flex justify-between items-center  w-48'>
                            <button
                                onClick={() => handleDecrement(place)}
                                className='border border-gray-200 py-[10px] px-5 rounded-full hover:border-gray-500'>
                                -
                            </button>
                            <div className='p-5 w-[50px] flex justify-center items-center'>
                                {placeSpace[place]}
                            </div>
                            <button
                                onClick={() => handleIncrement(place)}
                                className='border border-gray-200 py-[10px] px-5 rounded-full hover:border-gray-500'>
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FloorPlan