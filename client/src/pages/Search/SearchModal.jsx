import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import FloorPlan from '../../components/SearchHouse/FloorPlan'
import PlaceLocation from '../../components/SearchHouse/PlaceLocation'
import TripScheduler from '../../components/SearchHouse/TripScheduler/TripScheduler'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProperties } from '../../utils/api'
import { setData } from '../../store/slices/PropertiesSlice'
import { setIsOpen } from '../../store/slices/SearchSlice'

const SearchModal = () => {

    const [step, setStep] = useState(0)
    const [secondaryActionLabel, setSecondaryActionLabel] = useState(null)
    const [actionLabel, setActionLabel] = useState(null)
    const dispatch = useDispatch()
    const search = useSelector((state) => state.search)


    useEffect(() => {
        console.log(search.isOpen)
    }, [search])

    useEffect(() => {
        if (step === 0) {
            setActionLabel("Next")
            setSecondaryActionLabel(null)
        } else if (step === 2) {
            setSecondaryActionLabel("Previous")
            setActionLabel("Submit")
        } else {
            setSecondaryActionLabel("Previous")
            setActionLabel("Next")
        }
    }, [step, secondaryActionLabel, actionLabel])

    const PreviousStep = () => {
        setStep(step - 1)
    }

    const handleSubmit = async () => {
        if (step === 2) {
            const result = await getAllProperties(search)
            dispatch(setData(result))

        } else {
            setStep(step + 1)
        }
    }
    const handleClose = () => {
        dispatch(setIsOpen(false))
    }

    const getComponent = () => {
        switch (step) {
            case 0:
                return <PlaceLocation />
            case 1:
                return <TripScheduler />
            case 2:
                return <FloorPlan />
            default:
                return <></>
        }
    }

    return (
        <Modal title={"Filter"} isOpen={search.isOpen} onClose={handleClose} body={getComponent()} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} secondaryAction={PreviousStep} onSubmit={handleSubmit} />
    )
}

export default SearchModal