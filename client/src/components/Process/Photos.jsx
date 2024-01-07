import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removePhotos, setPhotos } from '../../store/slices/ProcessSlice'
import { HiXMark } from 'react-icons/hi2'
import { motion } from 'framer-motion'
import { basic, containerVariants, squareVariants } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'
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

    const dispatch = useDispatch()

    const removePhoto = (name) => {
        dispatch(removePhotos(name))
    }

    useEffect(() => {
        if (photos.length < 5) {
            dispatch(setValidStep({ step: 9, status: false }));
            return
        }
        dispatch(setValidStep({ step: 9, status: true }));
    }, [photos])

    return (
        <>
            <motion.div
                variants={basic(0, 1)}
                initial="hidden"
                animate="visible"
                className='flex flex-col h-[70vh] gap-5 items-center justify-center phone:px-3'>
                <div className='' >
                    <motion.h2
                        variants={basic(20, 0.5, 0.2)}
                        initial="hidden"
                        animate="visible"
                        className='font-semibold laptop:text-[32px] phone:text-[26px]'>
                        Add some photos of your house
                    </motion.h2>
                    <motion.p
                        variants={basic(0, 2, 0.4)}
                        initial="hidden"
                        animate="visible"
                        className='text-[#717171]'>
                        You'll need 5 photos to get started . You can add more or make changes
                    </motion.p>
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
                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className='py-10 grid grid-cols-6 gap-10 px-[100px] '>
                    {photos && photos.map((file, i) => (
                        <motion.li
                            variants={squareVariants}
                            whileTap={{ scale: 0.95 }}
                            key={i} className='relative h-32 rounded-md shadow-lg'>
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
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </>

    )
}

export default Photos