import React from 'react'
import { iconBnbs } from '../../utils/iconBnb'
import { useSelector, useDispatch } from 'react-redux'
import { setLocationType } from '../../store/slices/ProcessSlice'
const ListingTypeSelector = () => {
    const locationType = useSelector((state) => state.CreateProcess.locationType)
    console.log(locationType)
    const dispatch = useDispatch();
    return (
        <div className='flex justify-center h-[70vh]'>
            <div className=''>
                <h2 className='text-4xl font-semibold mb-[50px]'>Which of these best descripbes your place</h2>
                <div className='h-[60vh] overflow-auto no-scrollbar'>
                    <div className='grid grid-cols-3 gap-5 '>
                        {iconBnbs.map((icon, i) => (
                            <button
                                onClick={() => dispatch(setLocationType(icon.name))}
                                key={icon.name} className={`flex flex-col 
                        font-semibold border
                        border-gray-300 rounded-md p-3
                        hover:border-gray-950
                        transition-all
                        duration-300
                        ${locationType === icon.name ? 'border-gray-950 bg-slate-100' : ''}
                    `}>
                                <img className='w-[45px]' src={icon.icon} />
                                <span>{icon.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingTypeSelector