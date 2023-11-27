import React from 'react'
import Photos from '../../../components/EditDetails/Photos'
import ListingBasic from '../../../components/EditDetails/ListingBasic/ListingBasic'
import Address from '../../../components/EditDetails/Location/Address'
import Amenities from '../../../components/EditDetails/Amenities/Amenities'
import useProperty from '../../../hooks/useProperty'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setDescription, setLocation, setLocationType, setMapData, setPhotos, setPlaceAmeneties, setPlaceSpace, setPlaceType, setPrice, setTitle } from '../../../store/slices/EditPropSlice'
import { updateResidency } from '../../../api/Residency'
import { useMutation, useQueryClient } from 'react-query'

const EditResidency = () => {

    const { propertyId } = useParams()
    const dispatch = useDispatch()
    console.log(propertyId)
    const { data, isLoading, isError, isSuccess } = useProperty(propertyId)
    if (isSuccess) {
        dispatch(setTitle(data.title))
        dispatch(setLocationType(data.locationType))
        dispatch(setPlaceType(data.placeType))
        dispatch(setLocation(data.locationData))
        dispatch(setMapData(data.mapData))
        dispatch(setPlaceSpace(data.placeSpace))
        dispatch(setPlaceAmeneties(data.placeType))
        dispatch(setPhotos(data.photos))
        dispatch(setDescription(data.description))
        dispatch(setPrice(data.price))
    }
    console.log(data)


    if (isLoading) {
        return <p></p>
    }

    return (
        <div>
            <Photos />
            <div className='bg-[#d4d3d3] h-[0.5px]'></div>
            <ListingBasic />
            <Amenities />
            <Address />
        </div>
    )
}

export default EditResidency