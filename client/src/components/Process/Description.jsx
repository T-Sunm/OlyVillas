import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDescription } from '../../store/slices/ProcessSlice'

const Description = () => {
    const description = useSelector((state) => state.CreateProcess.description)
    const dispatch = useDispatch()
    return (
        <div className='flex flex-col h-[70vh] gap-5 items-center justify-center'>
            <div className='flex flex-col gap-2 items-center'>
                <h2 className='font-semibold text-4xl'>
                    Create your description
                </h2>
                <p>
                    Share what makes your place special.
                </p>
            </div>
            <div className='flex flex-col gap-4'>
                <textarea
                    value={description}
                    className='border border-gray-400 h-56 w-[550px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-xl'
                    onChange={(e) => {
                        if (e.target.value.length <= 500) {
                            dispatch(setDescription(e.target.value))
                        }
                    }
                    }
                />
                <span>{description.length}/500</span>
            </div>
        </div>
    )
}

export default Description