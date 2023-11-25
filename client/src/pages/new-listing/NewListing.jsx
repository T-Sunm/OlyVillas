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
const NewListing = () => {
    const { token: UserToken, user } = useSelector((state) => state.auth.userInfo)
    const residency = useSelector((state) => state.CreateProcess)

    const step = useSelector((state) => state.StepSlice.step)
    const dispatch = useDispatch()
    const { mutate, isLoading } = useMutation({
        mutationFn: () => createResidency(residency, UserToken),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
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
                return <ProcessAmeneties />
            case 8:
                return <Photos />
            case 9:
                return <Title />
            case 10:
                return <Description />
            case 11:
                return <StepThreeStarter />
            case 12:
                return <Price />
            case 13:
                return <ListingCreated />
            default:
                return <></>
        }
    }
    const handlePrevious = () => {
        dispatch(setStepDecrease())
    }
    const handleNext = () => {
        dispatch(setStepIncrease())
    }
    const handleSubmit = () => {
        mutate()
        dispatch(setStepIncrease())
    }
    return (
        <div className='grid h-[100vh]'>
            <div className='flex justify-between px-20 items-center'>
                <img src='./logo2.png' />
                {step <= 13 && (
                    <button className='border border-gray-300 
                px-5 py-2 rounded-full font-semibold 
                hover:border-gray-700 cursor-pointer'>
                        Save & Exit
                    </button>
                )
                }
            </div>
            {getComponent()}
            <div className={`border-t-4 border-t-gray-300 flex items-center px-20 ${step > 0 ? "justify-between" : "justify-end"} `}>
                {step >= 1 && (
                    <button
                        onClick={handlePrevious}
                        className='py-3 px-10 text-airbnb-light-black underline hover:bg-gray-200 font-medium rounded-md cursor-pointer '>
                        Back
                    </button>
                )}
                {step < 12 ? (
                    <>
                        {step !== 0 ? (
                            <button
                                onClick={handleNext}
                                className='bg-[#222222] py-3 px-5 text-white font-medium rounded-md cursor-pointer'>
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
                ) : (
                    <button
                        className='bg-airbnb-theme-color py-3 px-5 text-white font-medium rounded-md cursor-pointer'
                        onClick={handleSubmit}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    )
}

export default NewListing