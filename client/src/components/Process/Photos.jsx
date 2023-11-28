import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { removePhotos, setPhotos } from '../../store/slices/ProcessSlice'
import { HiXMark } from 'react-icons/hi2'
import { setStepIncrease } from '../../store/slices/StepSlice'
const Photos = () => {
    const photos = useSelector((state) => state.CreateProcess.photos)
    const handleFileInputChange = (e) => {
        const file = e.target.files
        const filesArray = Array.from(file);
        filesArray.forEach(previewFile);
    }

    const previewFile = file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            dispatch(setPhotos(reader.result))
        }
    }

    console.log(photos)

    const dispatch = useDispatch()

    const removePhoto = (name) => {
        dispatch(removePhotos(name))
    }
    const handleNext = () => {
        dispatch(setStepIncrease())
    }
    return (
        <>
            <div className='flex flex-col h-[70vh] gap-5 items-center justify-center'>
                <div >
                    <h2 className='font-semibold text-4xl'>
                        Add some photos of your house
                    </h2>
                    <p>
                        You'll need 5 photos to get started . You can add more or make changes
                    </p>
                </div>
                {/* <span
                    onClick={() => widgetRef.current?.open()}
                    className='bg-airbnb-theme-color py-3 mt-5 px-5 text-white rounded-md cursor-pointer'>
                    Upload
                </span> */}
                <form>
                    <input type='file' name='image' className='form-input' onChange={(e) => handleFileInputChange(e)} />
                </form>
                {/* Preview */}
                <h3 className='text-lg font-semibold text-neutral-600  border-b pb-3'>
                    Accepted Files
                </h3>
                <ul className='py-10 grid grid-cols-6 gap-10 px-[100px] '>
                    {photos && photos.map((file, i) => (
                        <li key={i} className='relative h-32 rounded-md shadow-lg'>
                            <img
                                src={file}
                                width={100}
                                height={100}
                                className='h-full w-full object-contain rounded-md'
                            />
                            <button
                                type='button'
                                className='w-7 h-7 border border-secondary-400 bg-airbnb-theme-color rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                                onClick={() => removePhoto(file)}
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
        </>

    )
}

export default Photos