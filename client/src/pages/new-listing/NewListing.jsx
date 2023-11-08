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

const NewListing = () => {
    const [step, setStep] = useState(0)
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
        }
    }
    const handlePrevious = () => {
        setStep(step - 1)
    }
    const handleNext = () => {
        setStep(step + 1)
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

            </div>
        </div>
    )
}

export default NewListing