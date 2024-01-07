import React from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import './SelectInput.css'
const SelectInput = ({ title, data, value, setValue }) => {

    const currentValueName = data[value]

    return (
        <div className='w-full relative bg-white'>
            <div className='mb-[8px]'>
                <span className='text-[16px] font-semibold'>{title}</span>
            </div>
            <div className='flex justify-between p-[1rem] border items-center rounded-sm cursor-pointer group  '>
                <span>{currentValueName}</span>
                <TiArrowSortedDown className='' />
                {/* làm hiệu ứng này phải thêm transition để visible được giữ lâu hơn */}
                <div className='rounded-[4px] absolute SelectInput w-full top-[90px] left-0 max-h-[200px] p-2 bg-white
                                overflow-y-scroll opacity-0 invisible group-hover:visible 
                                group-hover:opacity-100 transition-all duration-200'>
                    {Object.entries(data).map(([key, value]) => (
                        <div
                            onClick={() => setValue(key)}
                            className='p-[5px] hover:bg-gray-400' key={key}>
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectInput