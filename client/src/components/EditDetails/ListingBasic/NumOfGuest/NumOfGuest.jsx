import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceSpace } from '../../../../store/slices/EditPropSlice'
import useEditProp from '../../../../hooks/useEditProp'
import { useParams } from 'react-router-dom'

const NumOfGuest = () => {

    const placeSpace = useSelector((state) => state.EditProp.placeSpace)
    const dispatch = useDispatch()
    const { editProperty } = useEditProp();
    const { propertyId } = useParams()
    const handleIncrement = async () => {
        await dispatch(setPlaceSpace({ ...placeSpace, ["guetsts"]: placeSpace["guetsts"] + 1 }))
        editProperty(propertyId)
    }

    const handleDecrement = async (guest) => {
        await dispatch(setPlaceSpace({ ...placeSpace, ["guetsts"]: placeSpace["guetsts"] - 1 }))
        editProperty(propertyId)
    }
    return (
        <div className='flex justify-between items-center border-b-[0.5px] pb-[24px] mb-[24px]'>
            <div>
                Number of guests
            </div>
            <div className='flex justify-between items-center w-48'>
                <button
                    onClick={() => handleDecrement()}
                    className='border border-gray-200 py-[10px] px-[17px]  rounded-full hover:border-gray-500'>
                    -
                </button>
                <div className='p-5 w-[50px] flex justify-center items-center'>
                    {placeSpace.guetsts}
                </div>
                <button
                    onClick={() => handleIncrement()}
                    className='border border-gray-200 py-[10px] px-[17px]  rounded-full hover:border-gray-500'>
                    +
                </button>
            </div>
        </div>
    )
}

export default NumOfGuest