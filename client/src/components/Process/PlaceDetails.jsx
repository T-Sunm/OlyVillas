import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMapData } from '../../store/slices/ProcessSlice'
import FormInput from '../Input/FormInput/FormInput'


const PlaceDetails = () => {
    const mapData = useSelector((state) => state.CreateProcess.mapData)
    const dispatch = useDispatch()

    const handleChange = (name, value) => {
        dispatch(setMapData({ ...mapData, [name]: value }))
    }

    const [item, setItem] = useState('')
    return (
        <div className='flex flex-col justify-center items-center gap-2 w-full h-[70vh]'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-4xl'>Confirm your address</h2>
                <p>Your address is only shared with guests after they've made
                    a reservation
                </p>
            </div>
            <div className='flex flex-col gap-3 w-full h-full overflow-auto no-scrollbar pb-20 pt-5  items-center'>
                <div className={`w-[30%]  ${item === "country" ? '' : 'border border-t-[#b0b0b0] border-x-[#b0b0b0] rounded-lg'}`}>
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
                </div>
                <div className={`flex flex-col w-[30%]  border border-t-[#b0b0b0] border-x-[#b0b0b0]  rounded-lg overflow-hidden`}>
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
                    />
                    <FormInput
                        isListing
                        title="Province / state / territory (if applicable)"
                        name="place"
                        setValue={handleChange}
                        type='text'
                        value={mapData?.region ? mapData?.place + ", " + mapData?.region : mapData?.place}
                        item={item}
                        setItem={setItem}
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
                    />

                </div>
            </div>
        </div>
    )
}

export default PlaceDetails