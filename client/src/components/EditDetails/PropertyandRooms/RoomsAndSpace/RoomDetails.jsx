import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceSpace } from '../../../../store/slices/EditPropSlice'
import useEditProp from '../../../../hooks/useEditProp'
import { useParams } from 'react-router-dom'
const RoomDetails = ({ setToggle }) => {
    const { propertyId } = useParams()
    const placeSpace = useSelector((state) => state.EditProp.placeSpace)
    const dispatch = useDispatch()
    const { editProperty } = useEditProp();

    const handleClose = () => {
        setToggle(false)
    }

    const handleIncrement = async (type) => {
        const incrementValue = type === 'bathrooms' ? 0.5 : 1;
        await dispatch(setPlaceSpace({
            ...placeSpace,
            [type]: {
                ...placeSpace[type],
                quantity: placeSpace[type].quantity + incrementValue
            }
        }));
        editProperty(propertyId)

    };

    const handleDecrement = async (type) => {
        const decrementValue = type === 'bathrooms' ? 0.5 : 1;
        await dispatch(setPlaceSpace({
            ...placeSpace,
            [type]: {
                ...placeSpace[type],
                quantity: placeSpace[type].quantity - decrementValue
            }
        }));

        editProperty(propertyId)
    };

    return (
        <div className='border-[0.5px] rounded-xl'>
            <div className='pt-[24px] px-[24px]'>
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                        <span className='text-[16px] font-semibold'>Rooms and spaces</span>
                        <span className='text-[12px] text-[#717171] mt-[4px]'>
                            Add or edit areas guests can use and mark any spaces they’ll share.
                        </span>
                    </div>
                    <div onClick={handleClose}>
                        <IoMdClose color='#717171' size={20} />
                    </div>
                </div>
            </div>
            <div className='px-[24px]'>
                {Object.keys(placeSpace).map((place, i) => (
                    // Kiểm tra xem place có phải là "guests" hay không
                    place !== "guetsts" && (
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
                    )
                ))}
            </div>
        </div>
    )
}

export default RoomDetails