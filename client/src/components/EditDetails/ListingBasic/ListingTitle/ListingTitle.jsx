import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../../store/slices/EditPropSlice';
import useEditProp from '../../../../hooks/useEditProp';
import { useParams } from 'react-router-dom';

const ListingTitle = () => {

    const [toggle, setToggle] = useState(false)
    const { propertyId } = useParams()
    const title = useSelector((state) => state.EditProp.title)
    const [localTitle, setLocalTitle] = useState(title);
    const dispatch = useDispatch()
    const { editProperty } = useEditProp();
    const handleTitle = (e) => {
        setLocalTitle(e.target.value)
    }
    const handleClose = () => {
        setToggle(false)
        if (localTitle !== title) {
            setLocalTitle(title)
        }
    }

    const handleSave = async () => {
        await dispatch(setTitle(localTitle))
        editProperty(propertyId)
    }
    return (
        <>
            {!toggle ? (
                <div className='flex justify-between border-b-[0.5px] pb-[24px] mb-[24px]'>
                    <div className='flex flex-col'>
                        <span className='text-[16px]'>
                            Listing title
                        </span>
                        <span className='text-[#888888] text-[14px] mt-[4px]'>
                            {title}
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
                                <span className='text-[16px] font-semibold'>Listing title</span>
                                <span className='text-[12px] text-[#717171] mt-[4px]'>Highlight what makes your place special.
                                    <span className='text-[12px] text-black font-semibold underline'>Review listing title guidelines.</span>
                                </span>
                            </div>
                            <div onClick={handleClose}>
                                <IoMdClose color='#717171' size={20} />
                            </div>
                        </div>
                        <div className='mt-[24px] w-[600px]'>
                            <div className='border border-[#b0b0b0] rounded-lg my-[8px] w-full'>
                                <input className='my-[18px] mx-[12px] w-[98%] outline-none' value={localTitle} onChange={e => handleTitle(e)} />
                            </div>
                            <span className='text-[12px] text-[#717171]'>
                                {localTitle.length}/50
                            </span>
                        </div>
                    </div>
                    <div className='border-t-[0.5px] mt-[16px] py-[16px] px-[24px]'>
                        <div className='flex justify-between items-center'>
                            <div className='text-[14px] font-semibold underline'>
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

export default ListingTitle