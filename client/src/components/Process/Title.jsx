import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../../store/slices/ProcessSlice'
import { motion } from 'framer-motion'
import { basic } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'
const Title = () => {
    const title = useSelector((state) => state.CreateProcess.title)
    const dispatch = useDispatch()
    useEffect(() => {
        if (title.length <= 0 || title.length > 32) {
            dispatch(setValidStep({ step: 10, status: false }));
            return
        }
        dispatch(setValidStep({ step: 10, status: true }));
    }, [title])

    return (
        <motion.div
            variants={basic(0, 1)}
            initial="hidden"
            animate="visible"
            className='flex flex-col h-[70vh] gap-5 items-center justify-center phone:px-3'>
            <div className='flex flex-col gap-2'>
                <motion.h2
                    variants={basic(20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className='font-semibold laptop:text-[32px] phone:text-[26px]'>
                    Now let's give your house a title
                </motion.h2>
                <motion.p
                    variants={basic(0, 2, 0.4)}
                    initial="hidden"
                    animate="visible"
                    className='text-[#717171]'>
                    Short titles work best. Have fun with it you can always change it later.
                </motion.p>
            </div>
            <motion.div
                variants={basic(-20, 1, 0.2)}
                initial="hidden"
                animate="visible" v
                className='flex flex-col gap-4'>
                <textarea
                    value={title}
                    className='border border-gray-400 h-40 tablet:w-[550px] phone:w-full rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl'
                    onChange={(e) => {
                        if (e.target.value.length <= 32) {
                            dispatch(setTitle(e.target.value))
                        }
                    }
                    }
                />
                <span>{title.length}/32</span>
            </motion.div>
        </motion.div>
    )
}

export default Title