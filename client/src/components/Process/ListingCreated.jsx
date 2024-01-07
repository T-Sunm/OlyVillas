import React from 'react'
import Confetti from 'react-confetti'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setStep } from '../../store/slices/StepSlice'
const ListingCreated = () => {

    const dispatch = useDispatch()

    const handlendProcess = () => {
        dispatch(setStep(0))
    }

    return (
        <div className='flex flex-col gap-5 items-center justify-center h-[70vh]'>
            <div className='flex flex-col gap-2 items-center justify-between'>
                <h2 className='font-semibold text-4xl'>
                    Congratulations!
                </h2>
                <p>
                    You have successfully created your listing!
                </p>
            </div>
            <div className='flex gap-5'>
                <Link to={"/all-properties"}>
                    <button onClick={handlendProcess} className='bg-[#222222] py-3 mt-5 px-5 text-white font-medium rounded-md '>
                        Visit Home Page
                    </button>
                </Link>
                <Link to={"/hosting/listings"}>
                    <button onClick={handlendProcess} className='bg-airbnb-theme-color py-3 mt-5 px-5 text-white font-medium rounded-md '>
                        View your listings
                    </button>
                </Link>

            </div>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </div>
    )
}

export default ListingCreated