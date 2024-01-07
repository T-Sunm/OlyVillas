import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMapData } from '../../store/slices/ProcessSlice'
import FormInput from '../Input/FormInput/FormInput'
import { motion } from 'framer-motion'
import { basic } from '../../utils/common'
import { setValidStep } from '../../store/slices/StepSlice'

const PlaceDetails = () => {
    const mapData = useSelector((state) => state.CreateProcess.mapData)
    const dispatch = useDispatch()

    const [place, setPlace] = useState(mapData?.place !== "" ? (mapData?.place + ", " + mapData?.region) : mapData?.place)

    function handleChange(name, value) {
        dispatch(setMapData({ ...mapData, [name]: value }))
        console.log(value)
    }
    const handleChangePlace = (name, value) => {
        setPlace(value)
        dispatch(setMapData({ ...mapData, [name]: place }))
        console.log(mapData)
    }
    useEffect(() => {
        if (mapData["country"] === "" || mapData["street_address"] === "" || mapData["place"] === "") {
            dispatch(setValidStep({ step: 5, status: false }));
            return
        }
        dispatch(setValidStep({ step: 5, status: true }));
    }, [mapData])
    const [item, setItem] = useState('')
    return (
        <motion.div
            variants={basic(0, 1)}
            initial="hidden"
            animate="visible"
            className='flex flex-col justify-center items-center gap-2 w-full h-[70vh]'>
            <motion.div className='flex flex-col gap-3'>
                <motion.h2
                    variants={basic(20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className='font-semibold laptop:text-[32px] phone:text-[26px]'>Confirm your address</motion.h2>
                <motion.p
                    variants={basic(0, 2, 0.4)}
                    initial="hidden"
                    animate="visible"
                    className='text-[#717171]'>Your address is only shared with guests after they've made
                    a reservation
                </motion.p>
            </motion.div>
            <div className='flex flex-col gap-3 w-full h-full overflow-auto no-scrollbar pb-20 pt-5  items-center'>
                <motion.div
                    variants={basic(20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className={`laptop:w-[30%] tablet:w-[50%] ${item === "country" ? '' : 'border border-t-[#b0b0b0] border-x-[#b0b0b0] rounded-lg'}`}>
                    <FormInput
                        isListing
                        name="country"
                        title={"Country"}
                        setValue={handleChange}
                        type='text'
                        value={mapData?.country}
                        item={item}
                        setItem={setItem}
                    />
                </motion.div>
                <motion.div
                    variants={basic(-20, 0.5, 0.2)}
                    initial="hidden"
                    animate="visible"
                    className={`flex flex-col gap-[0.5px] laptop:w-[30%] tablet:w-[50%]  border border-t-[#b0b0b0] border-x-[#b0b0b0]  rounded-lg overflow-hidden`}>
                    <FormInput
                        isListing
                        title="Street address"
                        name="street_address"
                        setValue={handleChange}
                        type='text'
                        item={item}
                        setItem={setItem}
                        value={mapData?.street_address}
                    />
                    <FormInput
                        isListing
                        title="Apt,floor,bldg (if applicable)"
                        name="address_extra"
                        setValue={handleChange}
                        type='text'
                        item={item}
                        setItem={setItem}
                        value={mapData?.address_extra}
                        notCheckValid={true}
                    />
                    <FormInput
                        isListing
                        title="City/town/village (if applicable)"
                        name="locality"
                        setValue={handleChange}
                        type='text'
                        value={mapData?.locality}
                        item={item}
                        setItem={setItem}
                        notCheckValid={true}
                    />
                    <FormInput
                        isListing
                        title="Province / state / territory (if applicable)"
                        name="place"
                        setValue={handleChangePlace}
                        type='text'
                        value={place}
                        item={item}
                        setItem={setItem}
                        notCheckValid={true}
                    />
                    <FormInput
                        isListing
                        title="Postal code (if applicable)"
                        name="postcode"
                        setValue={handleChange}
                        type='text'
                        value={mapData?.postcode}
                        item={item}
                        setItem={setItem}
                        notCheckValid={true}
                    />

                </motion.div>
            </div>
        </motion.div>
    )
}

export default PlaceDetails