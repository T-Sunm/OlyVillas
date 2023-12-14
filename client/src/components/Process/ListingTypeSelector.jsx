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
            <div className='laptop:px-[80px] phone:px-3'>
                <h2 className='text-[32px] font-medium desktop:mb-[50px] phone:mb-[20px]'>Which of these best descripbes your place</h2>
                <div className='h-[60vh] overflow-auto no-scrollbar'>
                    <div className='grid tablet:grid-cols-3 phone:grid-cols-2 phone:px-3 gap-5 '>
                        {iconBnbs.map((icon, i) => (
                            <button
                                onClick={() => dispatch(setLocationType({ parentId: icon.parentId, name: icon.name }))}
                                key={icon.name} className={`flex flex-col 
                        font-semibold border
                        border-gray-300 rounded-md p-3
                        hover:border-gray-950
                        transition-all
                        duration-300
                        ${icon?.name === locationType?.name ? 'border-gray-950 bg-slate-100' : ''}
                    `}>
                                {icon.icon}
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