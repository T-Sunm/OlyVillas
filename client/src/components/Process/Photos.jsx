import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Photos = () => {

    const photos = useSelector((state) => state.CreateProcess.photos)
    const dispatch = useDispatch()

    const handleUpload = (data) => {

    }

    return (
        <div className='flex flex-col h-[70vh] gap-5 items-center justify-center'>
            <h2 className='font-semibold text-4xl'>
                Add some photos of your house
            </h2>
            <p>
                You'll need 5 photos to get started . You can add more or make changes
            </p>

        </div>
    )
}

export default Photos