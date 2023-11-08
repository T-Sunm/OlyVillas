import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMapData } from '../../store/slices/ProcessSlice'
import FormInput from '../FormInput/FormInput'

const PlaceDetails = () => {
    const mapData = useSelector((state) => state.CreateProcess.mapData)
    const dispatch = useDispatch()

    const handleChange = (name, value) => {
        dispatch(setMapData({ ...mapData, [name]: value }))
    }
    return (
        <div className='flex flex-col justify-center items-center gap-2 w-full h-[70vh]'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-4xl'>Confirm your address</h2>
                <p>Your address is only shared with guests after they've made
                    a reservation
                </p>
            </div>
            <div className='flex flex-col gap-3 w-full h-full overflow-auto no-scrollbar pb-20 pt-5  items-center'>
                <div className='flex flex-col gap-2 w-[30%]'>
                    <FormInput
                        isListing
                        name="country"
                        placeholder={"Country"}
                        setValue={handleChange}
                        type='text'
                        value={mapData?.country}
                    />
                    <FormInput
                        isListing
                        name="neighborhood"
                        placeholder={"House, flat, bldg, etc."}
                        setValue={handleChange}
                        type='text'
                        value={mapData?.neighborhood}
                    />
                </div>
                <div className='flex flex-col gap-2 w-[30%]'>
                    <FormInput
                        isListing
                        name="place"
                        placeholder={"Area/village (if applicable)"}
                        setValue={handleChange}
                        type='text'
                        value={mapData?.place}
                    />
                    <FormInput
                        isListing
                        name="locality"
                        placeholder={"Street Address"}
                        setValue={handleChange}
                        type='text'
                        value={mapData?.locality}
                    />
                </div>
                <div className='flex flex-col gap-2 w-[30%]'>
                    <FormInput
                        isListing
                        name="landmark"
                        placeholder={"Nearby landmark (if applicable)"}
                        setValue={handleChange}
                        type='text'
                        value={mapData?.place}
                    />
                    <FormInput
                        isListing
                        name="district"
                        placeholder={"City / town"}
                        setValue={handleChange}
                        type='text'
                        value={mapData?.district}
                    />
                </div>
            </div>
        </div>
    )
}

export default PlaceDetails