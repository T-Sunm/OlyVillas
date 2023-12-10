import React, { useEffect, useMemo } from 'react'
import data from '../../../../utils/EditAmenities'
import { IoCheckmarkSharp } from "react-icons/io5";
import useProperty from '../../../../hooks/useProperty';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaceAmeneties } from '../../../../store/slices/EditPropSlice';
import useEditProp from '../../../../hooks/useEditProp';
import { GoX } from "react-icons/go";
const EditAmenities = () => {

    const placeAmeneties = useSelector((state) => state.EditProp.placeAmeneties)
    const { propertyId } = useParams()
    const { data: dataRes, isLoading, isError, isSuccess } = useProperty(propertyId)
    const { editProperty } = useEditProp();
    const dispatch = useDispatch()

    useEffect(() => {
        if (dataRes) {
            dispatch(setPlaceAmeneties(dataRes.placeAmeneties));
        }
        console.log(dataRes)
    }, [dataRes]);
    const addAmentity = async (name, group) => {
        const updatedAmenities = [...placeAmeneties[group], name];
        await dispatch(setPlaceAmeneties({ ...placeAmeneties, [group]: updatedAmenities }));
        editProperty(propertyId)
    }
    const removeAmentity = async (name, group) => {
        const cloneAmenities = { ...placeAmeneties }
        const filteredAmenities = placeAmeneties[group].filter(amenitie => amenitie !== name);
        await dispatch(setPlaceAmeneties({ ...cloneAmenities, [group]: filteredAmenities }));
        console.log(placeAmeneties)
        editProperty(propertyId)
    }

    return (
        <div>
            {placeAmeneties && data[0] && (
                <div>
                    <div className='flex flex-col pt-[48px] pb-[8px]'>
                        <span className='text-[18px] font-semibold'>
                            {data[0]?.title}
                        </span>
                        <span className='text-[14px] text-[#717171] mt-[4px]'>
                            {data[0]?.description}
                        </span>
                    </div>
                    <div className='flex flex-col gap-5'>
                        {data[0].children.map(itemChild => (
                            <div className='flex justify-between border-b-[0.5px] py-[24px]'>
                                <div className='flex flex-col'>
                                    <span className='text-[16px] '>
                                        {itemChild.title}
                                    </span>
                                    <span className='text-[14px] text-[#717171] mt-[4px]'>
                                        {itemChild.description}
                                    </span>
                                </div>
                                <div className='flex justify-center items-center gap-5 '>
                                    <button
                                        onClick={() => {
                                            if (placeAmeneties[itemChild.key]?.includes(itemChild.title)) {
                                                removeAmentity(itemChild.title, itemChild.key)
                                            }
                                        }}
                                        className={`border border-[#717171] rounded-full p-2 text-[#717171] hover:text-black hover:border-black ${placeAmeneties[itemChild.key]?.includes(itemChild.title) ? '' : 'bg-black text-white'}`}>
                                        <GoX />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!placeAmeneties[itemChild.key]?.includes(itemChild.title)) {
                                                addAmentity(itemChild.title, itemChild.key)
                                            }
                                        }}
                                        className={`border border-[#717171] rounded-full p-2 text-[#717171] hover:text-black hover:border-black ${placeAmeneties[itemChild.key]?.includes(itemChild.title) ? 'bg-black text-white' : ''}`}>
                                        <IoCheckmarkSharp />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {placeAmeneties && data.slice(1).map(item => (
                <div>
                    <div className='flex flex-col pt-[48px] pb-[8px]'>
                        <span className='text-[18px] font-semibold'>
                            {item?.title}
                        </span>
                        <span className='text-[14px] text-[#717171] mt-[4px]'>
                            {item?.description}
                        </span>
                    </div>
                    <div className='flex flex-col gap-5'>
                        {item.children.map(itemChild => (
                            <div className='flex justify-between border-b-[0.5px] py-[24px]'>
                                <div className='flex flex-col'>
                                    <span className='text-[16px] '>
                                        {itemChild.title}
                                    </span>
                                    <span className='text-[14px] text-[#717171] mt-[4px]'>
                                        {itemChild.description}
                                    </span>
                                </div>
                                <div className='flex justify-center items-center gap-5 '>
                                    <button
                                        onClick={() => {
                                            if (placeAmeneties[item.key]?.includes(itemChild.title)) {
                                                removeAmentity(itemChild.title, item.key)
                                            }
                                        }}
                                        className={`border border-[#717171] rounded-full p-2 text-[#717171] hover:text-black hover:border-black ${placeAmeneties[item.key]?.includes(itemChild.title) ? '' : 'bg-black text-white'}`}>
                                        <GoX />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!placeAmeneties[item.key]?.includes(itemChild.title)) {
                                                addAmentity(itemChild.title, item.key);
                                            }
                                        }}
                                        className={`border border-[#717171] rounded-full p-2 text-[#717171] hover:text-black hover:border-black ${placeAmeneties[item.key]?.includes(itemChild.title) ? 'bg-black text-white' : ''}`}>
                                        <IoCheckmarkSharp />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default EditAmenities