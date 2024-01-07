import React, { useEffect } from 'react'
import { iconBnbs } from '../../utils/iconBnb'
import { useSelector, useDispatch } from 'react-redux'
import { setLocationType } from '../../store/slices/ProcessSlice'
import { motion } from 'framer-motion'
import { containerVariants, squareVariants } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'
const ListingTypeSelector = () => {
    const locationType = useSelector((state) => state.CreateProcess.locationType)
    console.log(locationType)
    const dispatch = useDispatch();

    useEffect(() => {
        if (locationType === undefined) {
            dispatch(setValidStep({ step: 2, status: false }));
            return
        }
        dispatch(setValidStep({ step: 2, status: true }));
    }, [locationType])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='flex justify-center h-[70vh]'>
            <div className='laptop:px-[80px] phone:px-3'>
                <h2 className='text-[32px] font-medium desktop:mb-[50px] phone:mb-[20px]'>Which of these best descripbes your place</h2>
                <div className='h-[60vh] overflow-auto no-scrollbar'>
                    <div className='grid tablet:grid-cols-3 phone:grid-cols-2 phone:px-3 gap-5 '>
                        {iconBnbs.map((icon, i) => (
                            // lưu ý : khi xài framer-motion thì không được css animation cho css nữa vì dễ xung đột
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                variants={squareVariants}
                                onClick={() => dispatch(setLocationType({ parentId: icon.parentId, name: icon.name }))}
                                key={icon.name} className={`flex flex-col 
                                font-semibold border
                              border-gray-300 rounded-md p-3
                              hover:border-gray-950
                                transition-colors duration-300 
                        ${icon?.name === locationType?.name ? 'border-gray-950 bg-slate-100' : ''}
                    `}>
                                {icon.icon}
                                <span>{icon.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ListingTypeSelector