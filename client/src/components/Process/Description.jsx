import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDescription } from '../../store/slices/ProcessSlice'
import { motion } from 'framer-motion'
import { basic } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'
const Description = () => {
    const description = useSelector((state) => state.CreateProcess.description)
    const dispatch = useDispatch()

    useEffect(() => {
        if (description.length <= 0 || description.length > 500) {
            dispatch(setValidStep({ step: 11, status: false }));
            return
        }
        dispatch(setValidStep({ step: 11, status: true }));
    }, [description])

    return (
        <motion.div
            variants={basic(0, 1)}
            initial="hidden"
            animate="visible"
            className='flex flex-col h-[70vh] gap-5 tablet:items-center justify-center phone:px-3'>
            <div className='flex flex-col gap-2 items-center'>
                <motion.h2
                    variants={basic(20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className='font-semibold laptop:text-[32px] phone:text-[26px]'>
                    Create your description
                </motion.h2>
                <motion.p
                    variants={basic(0, 2, 0.4)}
                    initial="hidden"
                    animate="visible"
                    className='text-[#717171]'>
                    Share what makes your place special.
                </motion.p>
            </div>
            <motion.div
                variants={basic(-20, 1, 0.2)}
                initial="hidden"
                animate="visible"
                className='flex flex-col gap-4'>
                <textarea
                    value={description}
                    className='border border-gray-400 h-56 tablet:w-[550px] phone:w-full rounded-lg active:border-gray-950 p-6  no-scrollbar text-xl'
                    onChange={(e) => {
                        if (e.target.value.length <= 500) {
                            dispatch(setDescription(e.target.value))
                        }
                    }
                    }
                />
                <span>{description.length}/500</span>
            </motion.div>
        </motion.div>
    )
}

export default Description