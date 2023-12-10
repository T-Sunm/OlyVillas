import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import useEditProp from '../../../../hooks/useEditProp';
import { setDescription } from '../../../../store/slices/EditPropSlice'
import { useParams } from 'react-router-dom';

const ListingDes = () => {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const description = useSelector((state) => state.EditProp.description)
    const [localDescription, setLocalDescription] = useState(description);
    const { editProperty } = useEditProp();
    const { propertyId } = useParams()

    const handleDes = (e) => {
        setLocalDescription(e.target.value)
    }

    const handleSave = async () => {
        await dispatch(setDescription(localDescription));
        editProperty(propertyId)
    };

    const handleClose = () => {
        setToggle(false)
        if (localDescription !== description) {
            setLocalDescription(description)
        }
    }
    return (
        <>
            {!toggle ? (
                <div className='flex justify-between border-b-[0.5px] pb-[24px] mb-[24px]'>
                    <div className='flex flex-col'>
                        <span className='text-[16px]'>
                            Listing description
                        </span>
                        <span className='text-[#888888] text-[14px] mt-[4px] '>
                            <p className='line-clamp-2'>
                                {description}
                            </p>
                        </span>
                    </div>
                    <div onClick={() => setToggle(true)}>
                        <span className='underline font-medium'>Edit</span>
                    </div>
                </div>
            ) : (
                <div className='border-[0.5px] rounded-xl'>
                    <div className='pt-[24px] px-[24px]'>
                        <div className='flex justify-between '>
                            <div className='flex flex-col'>
                                <span className='text-[16px] font-semibold'>Listing description</span>
                                <span className='text-[12px] text-[#717171] mt-[4px]'>
                                    Give guests a sense of what it’s like to stay at your place, including why they’ll love staying there.
                                </span>
                            </div>
                            <div onClick={handleClose}>
                                <IoMdClose color='#717171' size={20} />
                            </div>
                        </div>
                        <div className='mt-[24px] w-[600px]'>
                            <div className='border border-[#b0b0b0] rounded-lg my-[8px]  w-full overflow-hidden'>
                                <textarea rows={5} className='p-[8px] w-[98%]  outline-none' value={localDescription} onChange={(e) => handleDes(e)} />
                            </div>
                            <span className='text-[12px] text-[#717171]'>
                                {localDescription.length}/500
                            </span>
                        </div>
                    </div>
                    <div className='border-t-[0.5px] mt-[16px] py-[16px] px-[24px]'>
                        <div className='flex justify-between items-center'>
                            <div onClick={handleClose} className='text-[14px] font-semibold underline'>
                                Cancel
                            </div>
                            <div>
                                <button
                                    onClick={handleSave}
                                    className='rounded-[8px] text-[14px] font-semibold bg-black py-[8px] px-[12px] text-white'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default ListingDes