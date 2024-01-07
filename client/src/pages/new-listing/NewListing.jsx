import React, { useState } from 'react'
import Overview from '../../components/Process/Overview'
import StepOneStarter from '../../components/Process/StepOneStarter'
import ListingTypeSelector from '../../components/Process/ListingTypeSelector'
import ListingPlaceType from '../../components/Process/ListingPlaceType'
import PlaceLocation from '../../components/Process/PlaceLocation'
import PlaceDetails from '../../components/Process/PlaceDetails'
import FloorPlan from '../../components/Process/FloorPlan'
import ProcessAmeneties from '../../components/Process/ProcessAmeneties'
import Photos from '../../components/Process/Photos'
import { useDispatch, useSelector } from 'react-redux'
import { setStepDecrease, setStepIncrease } from '../../store/slices/StepSlice'
import Title from '../../components/Process/Title'
import Description from '../../components/Process/Description'
import StepThreeStarter from '../../components/Process/StepThreeStarter'
import Price from '../../components/Process/Price'
import ListingCreated from '../../components/Process/ListingCreated'
import { useMutation } from 'react-query'
import { createResidency } from '../../utils/api'
import { toast } from 'react-toastify'
import { setDescription, setLocation, setLocationType, setMapData, setPhotos, setPlaceAmeneties, setPlaceSpace, setPlaceType, setPrice, setTitle, setUserEmail } from '../../store/slices/ProcessSlice'
import StepTwoStarter from '../../components/Process/StepTwoStarter'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingDots from '../../components/Loading/LoadingDots'
import { Link } from 'react-router-dom'
import { queryClient } from '../../api/Residency'
const NewListing = () => {
    const { token: UserToken, user } = useSelector((state) => state.auth.userInfo)
    const residency = useSelector((state) => state.CreateProcess)

    const step = useSelector((state) => state.StepSlice.step)
    const Validstep = useSelector((state) => state.StepSlice.validSteps)

    const dispatch = useDispatch()
    const { mutate, isLoading } = useMutation({
        mutationFn: () => createResidency(residency, UserToken),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            queryClient.invalidateQueries(['allProperties'])
            toast.success("Added Successfully", { position: "bottom-right" })
            dispatch(setLocationType(undefined))
            dispatch(setPlaceType(undefined))
            dispatch(setLocation({ lng: 0, lat: 0 }))
            dispatch(setMapData(undefined))
            dispatch(setPlaceSpace({ bathrooms: 1, beds: 1, guetsts: 4 }))
            dispatch(setPlaceAmeneties([]))
            dispatch(setPhotos([]))
            dispatch(setTitle(""))
            dispatch(setDescription(""))
            dispatch(setPrice(10))
            dispatch(setStepIncrease())
        }
    })


    const getComponent = () => {
        switch (step) {
            case 0:
                return <Overview />
            case 1:
                return <StepOneStarter />
            case 2:
                return <ListingTypeSelector />
            case 3:
                return <ListingPlaceType />
            case 4:
                return <PlaceLocation />
            case 5:
                return <PlaceDetails />
            case 6:
                return <FloorPlan />
            case 7:
                return <StepTwoStarter />
            case 8:
                return <ProcessAmeneties />
            case 9:
                return <Photos />
            case 10:
                return <Title />
            case 11:
                return <Description />
            case 12:
                return <StepThreeStarter />
            case 13:
                return <Price />
            case 14:
                return <ListingCreated />
            default:
                return <></>
        }
    }
    const handlePrevious = () => {
        dispatch(setStepDecrease())
    }
    const handleNext = () => {

        if (!isLoading) {
            dispatch(setStepIncrease())
        }
    }
    const handleSubmit = async () => {
        await mutate()
        if (isLoading) {
            dispatch(setStepIncrease())
        }
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1
                }}
                className='grid h-[100vh]'>
                <div className='flex justify-between px-20 items-center'>
                    <Link to={"/all-properties"}>
                        <img src='./logo2.png' />
                    </Link>
                    {step <= 13 && (
                        <button className='border border-gray-300 
                px-5 py-2 rounded-full font-semibold 
                hover:border-gray-700 cursor-pointer'>
                            Save & Exit
                        </button>
                    )}
                </div>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 1
                    }}
                >
                    {getComponent()}
                </motion.div>

                {step <= 13 && (
                    <div className={`border-t-4 border-t-gray-300 flex items-center px-20 ${step > 0 ? "justify-between" : "justify-end"} `}>
                        {step >= 1 && step <= 13 && (
                            <button
                                onClick={handlePrevious}
                                className='py-3 px-10 text-airbnb-light-black underline hover:bg-gray-200 font-medium rounded-md cursor-pointer '>
                                Back
                            </button>
                        )}
                        {step < 13 && (
                            <>
                                {step !== 0 ? (
                                    <button
                                        disabled={!Validstep[step]}
                                        onClick={handleNext}
                                        className='bg-[#222222] py-3 px-5 text-white font-medium rounded-md cursor-pointer disabled:opacity-80'>
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className='bg-airbnb-theme-color py-3 px-5 text-white font-medium rounded-md cursor-pointer'>
                                        Get Started
                                    </button>
                                )}
                            </>
                        )
                        }
                        {step === 13 && (
                            <button
                                className='bg-airbnb-theme-color py-3 px-5 text-white font-medium rounded-md cursor-pointer'
                                onClick={handleSubmit}>
                                {isLoading ? (
                                    <LoadingDots />
                                ) : (
                                    <span>Submit</span>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>

    )
}

export default NewListing