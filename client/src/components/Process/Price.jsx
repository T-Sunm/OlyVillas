import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrice } from '../../store/slices/ProcessSlice'
import { motion } from 'framer-motion'
import { basic } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'
const Price = () => {
    const price = useSelector((state) => state.CreateProcess.price)
    const dispatch = useDispatch()

    const handleIncre = () => {
        if (price < 999990) {
            dispatch(setPrice(price + 10))
        } else {
            return
        }
    }

    const handleEncre = () => {
        if (price > 10) {
            dispatch(setPrice(price - 10))
        } else {
            return
        }
    }

    useEffect(() => {
        if (price < 10 || price > 1000000) {
            dispatch(setValidStep({ step: 12, status: false }));
            return
        }
        dispatch(setValidStep({ step: 12, status: true }));
    }, [price])

    return (
        <motion.div
            variants={basic(0, 1)}
            initial="hidden"
            animate="visible"
            className='flex flex-col h-[70vh] gap-5 items-center justify-center'>
            <div className='flex flex-col gap-2'>
                <motion.h2
                    variants={basic(20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className='font-semibold laptop:text-[32px] phone:text-[26px]'>
                    Now, set the price you want
                </motion.h2>
                <motion.p
                    variants={basic(0, 2, 0.4)}
                    initial="hidden"
                    animate="visible"
                    className='text-[#717171]'>
                    You can change this price at any time.
                </motion.p>
            </div>
            <div className='flex justify-center items-center gap-7 phone:px-3'>
                <motion.button
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: { type: 'spring', stiffness: 100, duration: 1, delay: 0.2 }
                    }}
                    initial={{
                        opacity: 0,
                        x: 20,
                        transition: { type: 'spring', stiffness: 100 }
                    }}
                    onClick={() => handleEncre()}
                    className='border border-gray-950 py-[10px] px-5 rounded-full hover:border-gray-500'>
                    -
                </motion.button>
                <motion.div
                    variants={basic(0, 1, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className='flex justify-center items-center gap-4'>
                    <textarea
                        className='border border-gray-400 h-[90px]  tablet:w-[250px] phone:w-full rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl'
                        value={price}
                        onInput={(e) => {
                            const value = e.target.value;
                            // Kiểm tra xem giá trị hiện tại có phải là số không
                            // Nếu không phải là số, thì thay thế bằng chuỗi rỗng
                            e.target.value = value.replace(/[^0-9]+/g,);
                        }}

                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            console.log(typeof value)
                            if (value >= 10 && value <= 1000000) {
                                dispatch(setPrice(value))
                            } else {
                                dispatch(setPrice(10))
                            }
                        }
                        }
                    />
                    <span className='tablet:text-[80px] phone:text-[60px]'>$</span>
                </motion.div>
                <motion.button
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: { type: 'spring', stiffness: 100, duration: 1, delay: 0.2 }
                    }}
                    initial={{
                        opacity: 0,
                        x: -20,
                        transition: { type: 'spring', stiffness: 100 }
                    }}
                    onClick={() => handleIncre()}
                    className='border border-gray-950 py-[10px] px-5 rounded-full hover:border-gray-500'>
                    +
                </motion.button>
            </div>
        </motion.div>
    )
}

export default Price