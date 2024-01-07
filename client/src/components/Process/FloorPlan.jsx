import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceSpace } from '../../store/slices/ProcessSlice'
import { motion } from 'framer-motion'
import { basic, containerVariants, squareVariants } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'
const FloorPlan = () => {
    const placeSpace = useSelector((state) => state.CreateProcess.placeSpace)
    const dispatch = useDispatch()
    const handleIncrement = (type) => {
        const incrementValue = type === 'bathrooms' ? 0.5 : 1;
        dispatch(setPlaceSpace({
            ...placeSpace,
            [type]: {
                ...placeSpace[type],
                quantity: placeSpace[type].quantity + incrementValue
            }
        }));
    };
    const handleDecrement = (type) => {
        const decrementValue = type === 'bathrooms' ? 0.5 : 1;
        if (placeSpace[type].quantity <= 0) {
            return
        }
        dispatch(setPlaceSpace({
            ...placeSpace,
            [type]: {
                ...placeSpace[type],
                quantity: placeSpace[type].quantity - decrementValue
            }
        }));
    };

    useEffect(() => {
        if (placeSpace["bathrooms"].quantity <= 0 || placeSpace["beds"].quantity <= 0 || placeSpace["guetsts"].quantity <= 0 || placeSpace["bedrooms"].quantity <= 0) {
            dispatch(setValidStep({ step: 6, status: false }));
            return
        }
        dispatch(setValidStep({ step: 6, status: true }));
    }, [placeSpace])
    return (
        <motion.div
            variants={basic(0, 1)}
            initial="hidden"
            animate="visible"
            className='flex flex-col justify-center items-center gap-5 w-full h-[70vh] phone:px-3 '>
            <div className='flex flex-col gap-3'>
                <motion.h2
                    variants={basic(20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className='font-semibold laptop:text-[32px] phone:text-[26px]'>Share some basics about your place</motion.h2>
                <motion.p
                    variants={basic(0, 2, 0.4)}
                    initial="hidden"
                    animate="visible"
                    className='text-[#717171]'>
                    You'll add more details later ,such as bed types
                </motion.p>
            </div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='flex flex-col tablet:w-[60%] laptop:w-[40%] gap-5 phone:w-full'>
                {Object.keys(placeSpace).map((place, i) => (
                    <motion.div
                        variants={squareVariants}
                        key={i} className='flex justify-between w-full text-lg items-center'>
                        <span className='capitalize'>{place}</span>
                        <div className='flex justify-between items-center  w-48'>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDecrement(place)}
                                className='border border-gray-200 py-[10px] px-5 rounded-full hover:border-gray-500'>
                                -
                            </motion.button>
                            <div className='p-5 w-[50px] flex justify-center items-center'>
                                {placeSpace[place].quantity}
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleIncrement(place)}
                                className='border border-gray-200 py-[10px] px-5 rounded-full hover:border-gray-500'>
                                +
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default FloorPlan