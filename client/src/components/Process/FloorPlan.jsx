import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceSpace } from '../../store/slices/ProcessSlice'

const FloorPlan = () => {
    const placeSpace = useSelector((state) => state.CreateProcess.placeSpace)
    const dispatch = useDispatch()
    const handleIncrement = (type) => {
        const incrementValue = type === 'bathrooms' ? 0.5 : 1;
        dispatch(setPlaceSpace({
            ...placeSpace,
            [type]: {
                ...placeSpace[type],
                quantity: placeSpace[type].quantity + incrementValue
            }
        }));
    };
    const handleDecrement = (type) => {
        const decrementValue = type === 'bathrooms' ? 0.5 : 1;
        dispatch(setPlaceSpace({
            ...placeSpace,
            [type]: {
                ...placeSpace[type],
                quantity: placeSpace[type].quantity - decrementValue
            }
        }));
    };
    return (
        <div className='flex flex-col justify-center items-center gap-5 w-full h-[70vh] phone:px-3 '>
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold laptop:text-[32px] phone:text-[26px]'>Share some basics about your place</h2>
                <p className='text-[#717171]'>
                    You'll add more details later ,such as bed types
                </p>
            </div>
            <div className='flex flex-col tablet:w-[60%] laptop:w-[40%] gap-5 phone:w-full'>
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
                                {placeSpace[place].quantity}
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