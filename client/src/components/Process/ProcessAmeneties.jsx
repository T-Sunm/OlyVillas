import React, { useEffect } from 'react'
import { AmenetiesType } from '../../data/Amenities'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceAmeneties } from '../../store/slices/ProcessSlice'
import "./style.css"
import { motion } from 'framer-motion'
import { basic, containerVariants, squareVariants } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'
const ProcessAmeneties = () => {

    const placeAmeneties = useSelector((state) => state.CreateProcess.placeAmeneties)
    console.log(placeAmeneties)
    const dispatch = useDispatch()

    const addAmentity = (name, group) => {
        const updatedAmenities = [...placeAmeneties[group], name];
        dispatch(setPlaceAmeneties({ ...placeAmeneties, [group]: updatedAmenities }));
    }
    const removeAmentity = (name, group) => {
        const filteredAmenities = placeAmeneties[group].filter(amenitie => amenitie !== name);
        dispatch(setPlaceAmeneties({ ...placeAmeneties, [group]: filteredAmenities }));
    }
    useEffect(() => {
        if (placeAmeneties["Bathroom"].length > 0 ||
            placeAmeneties["BedroomandLaundry"].length > 0 ||
            placeAmeneties["Entertainment"].length > 0 ||
            placeAmeneties["HeatingandCooling"].length > 0 ||
            placeAmeneties["HomeSafety"].length > 0 ||
            placeAmeneties["InternetandOffice"].length > 0 ||
            placeAmeneties["KitchenandDining"].length > 0 ||
            placeAmeneties["LocationFeatures"].length > 0 ||
            placeAmeneties["Outdoor"].length > 0 ||
            placeAmeneties["ParkingandFacilities"].length > 0 ||
            placeAmeneties["Services"].length > 0
        ) {
            dispatch(setValidStep({ step: 8, status: true }));
            return
        }
        dispatch(setValidStep({ step: 8, status: false }));
    }, [placeAmeneties])
    return (
        <motion.div
            variants={basic(0, 1)}
            initial="hidden"
            animate="visible"
            className='flex flex-col items-center justify-center h-[70vh]'>
            <div className='flex flex-col gap-3 phone:px-3 '>
                <motion.h2
                    variants={basic(20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className='font-semibold laptop:text-[32px] phone:text-[26px]'>
                    Tell guests what your place has to offer
                </motion.h2>
                <motion.p
                    variants={basic(0, 2, 0.4)}
                    initial="hidden"
                    animate="visible"
                    className='text-[#717171]'>You can add more ameneties after you publish your listing</motion.p>
            </div>
            <div className='flex flex-col gap-4 max-h-[65vh] overflow-auto no-scrollbar py-4'>
                {
                    AmenetiesType.map(({ type, data }, i) => (
                        <div key={i} className='flex flex-col gap-5'>
                            {type === "advanced" && (
                                <span className='text-lg font-medium'>
                                    Do you have any standout amenities?
                                </span>
                            )}
                            {type === "safety" && (
                                <span className='text-lg font-medium'>
                                    Do you have any safety items?
                                </span>
                            )}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className='grid tablet:grid-cols-3 phone:grid-cols-2 phone:px-3 gap-5 '>
                                {data.map((amenities) => (
                                    <motion.button
                                        variants={squareVariants}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => placeAmeneties[amenities.group].includes(amenities.name) ?
                                            removeAmentity(amenities.name, amenities.group) :
                                            addAmentity(amenities.name, amenities.group)}
                                        key={amenities.name} className={` flex flex-col justify-start border 
                                         rounded-md p-3 
                                        ${placeAmeneties[amenities.group].includes(amenities.name) ? "border-gray-950 bg-gray-50" : "border-gray-300 "}
                                        hover:border-gray-950 transition-colors duration-300`}>
                                        {amenities.svgPath}
                                        <span className='text-airbnb-light-black font-medium'>
                                            {amenities.name}
                                        </span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default ProcessAmeneties