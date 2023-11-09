import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { removePhotos, setPhotos } from '../../store/slices/ProcessSlice'
import { HiXMark } from 'react-icons/hi2'
import { setStepIncrease } from '../../store/slices/StepSlice'
const Photos = () => {
    const photos = useSelector((state) => state.CreateProcess.photos)
    const dispatch = useDispatch()
    console.log(photos)
    // sài useCallBack để kh rerender lại hàm
    const onDrop = useCallback(acceptedFiles => {
        const acceptedFile = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        )
        console.log(Array.isArray(acceptedFile))
        if (acceptedFiles?.length) {
            dispatch(setPhotos(acceptedFile))
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            onDrop,
            accept: {
                // chấp nhận any type của image
                'image/*': []
            },
        })

    const removePhoto = (name) => {
        dispatch(removePhotos(name))
    }
    const handleNext = () => {
        dispatch(setStepIncrease())
    }
    return (
        <>
            <div className='flex flex-col h-[70vh] gap-5 items-center justify-center'>
                <div>
                    <h2 className='font-semibold text-4xl'>
                        Add some photos of your house
                    </h2>
                    <p>
                        You'll need 5 photos to get started . You can add more or make changes
                    </p>
                </div>
                <div {...getRootProps({
                    className: 'p-16 mt-10 border border-neutral-200'
                })} >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag and drop some files here, or click to select files</p>
                    }
                </div>

                {/* Preview */}
                <h3 className='text-lg font-semibold text-neutral-600  border-b pb-3'>
                    Accepted Files
                </h3>
                <ul className='py-10 grid grid-cols-6 gap-10 px-[100px] '>
                    {photos && photos.map((file, i) => (
                        <li key={i} className='relative h-32 rounded-md shadow-lg'>
                            <img
                                src={file?.preview}
                                alt={file?.name}
                                width={100}
                                height={100}
                                className='h-full w-full object-contain rounded-md'
                            />
                            <button
                                type='button'
                                className='w-7 h-7 border border-secondary-400 bg-airbnb-theme-color rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                                onClick={() => removePhoto(file?.name)}
                            >
                                <HiXMark className='w-5 h-5 fill-white hover:fill-black transition-colors ' />
                            </button>
                            <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                                {file?.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <button

                onClick={handleNext}
                className='bg-[#222222] py-3 px-5 text-white font-medium rounded-md cursor-pointer absolute right-20 bottom-5'>
                Next
            </button>
        </>

    )
}

export default Photos