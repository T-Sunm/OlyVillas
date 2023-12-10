import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceSpace } from '../../store/slices/SearchSlice'

const FloorPlan = () => {
    const { placeSpace } = useSelector((state) => state.search)
    const dispatch = useDispatch()

    const descriptionPlaceSpace = useMemo(() => [
        {
            key: "bathrooms",
            description: "How many bathrooms are coming?"
        },
        {
            key: "beds",
            description: "How many beds do you need?"
        },
        {
            key: "guests",
            description: "How many guests are coming?"
        },
        {
            key: "bedrooms",
            description: "How many bedrooms do you need?"
        },
    ], [placeSpace]);

    const getDescription = useCallback((key) => {
        const foundItem = descriptionPlaceSpace.find(item => item.key === key);
        return foundItem ? foundItem.description : "Description not found";
    }, [descriptionPlaceSpace]);

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
        <div className='flex flex-col  gap-5 w-full h-[50vh] '>
            <div className='flex flex-col '>
                <h2 className='font-semibold text-4xl'>More information</h2>
                <p className='text-[#717171] mt-2'>
                    Find your perfect place!
                </p>
                <p className='text-[#717171] text-[14px]'>
                    (if you don't want search , please edit it to 0)
                </p>
            </div>
            <div className='flex flex-col gap-5'>
                {Object.keys(placeSpace).map((place, i) => (
                    <div key={i} className='flex justify-between text-lg items-center'>
                        <div className='flex flex-col'>
                            <span className='capitalize'>{place}</span>
                            <span className='font-light text-gray-600 text-[14px]'>{getDescription(place)}</span>
                        </div>
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