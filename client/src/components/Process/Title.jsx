import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../../store/slices/ProcessSlice'

const Title = () => {
    const title = useSelector((state) => state.CreateProcess.title)
    const dispatch = useDispatch()
    return (
        <div className='flex flex-col h-[70vh] gap-5 items-center justify-center'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-semibold text-4xl'>
                    Now let's give your house a title
                </h2>
                <p>
                    Short titles work best. Have fun with it you can always change it later.
                </p>
            </div>
            <div className='flex flex-col gap-4'>
                <textarea
                    value={title}
                    className='border border-gray-400 h-40 w-[550px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl'
                    onChange={(e) => {
                        if (e.target.value.length < 32) {
                            dispatch(setTitle(e.target.value))
                        }
                    }
                    }
                />
                <span>{title.length}/32</span>
            </div>
        </div>
    )
}

export default Title