import React, { useRef, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import { IoMdClose } from "react-icons/io"
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setMapData, setPreLocationData, setPreMapData } from '../../../store/slices/EditPropSlice';
import useEditProp from '../../../hooks/useEditProp';
import { useParams } from 'react-router-dom';

const FormAddress = ({ toggle, setToggle }) => {
    const mapRef = useRef()
    const dispatch = useDispatch()
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    const { lng, lat } = useSelector((state) => state.EditProp.preLocationData)
    const mapData = useSelector((state) => state.EditProp.preMapData)
    const OriMapData = useSelector((state) => state.EditProp.mapData)
    const { lng: OriLng, lat: OriLat } = useSelector((state) => state.EditProp.locationData)
    const { editProperty } = useEditProp();
    const { propertyId } = useParams()
    const [item, setItem] = useState('')

    const handleChange = (name, value) => {
        dispatch(setPreMapData({ ...mapData, [name]: value }))
    }

    const handleClose = () => {
        if (lng !== OriLng || lat !== OriLat || JSON.stringify(mapData) !== JSON.stringify(OriMapData)) {
            dispatch(setPreMapData(OriMapData))
            dispatch(setPreLocationData({ lng: OriLng, lat: OriLat }))
        }
        setToggle(false)
    }

    const handleSave = async () => {
        await dispatch(setLocation({ lng, lat }));
        await dispatch(setMapData(mapData));
        editProperty(propertyId)
        setToggle(false)

    };
    return (
        <div className='relative z-50'>
            <div className='fixed inset-0 bg-gray-300 opacity-75'></div>
            <div className='fixed inset-0 z-10 overscroll-y-auto'>
                <div className='flex  min-h-full justify-center items-center '>
                    <div className=' flex flex-col h-full overflow-auto no-scrollbar pt-5 '>
                        <div className='bg-white flex flex-col w-[550px] rounded-[12px]'>
                            <div className='px-[24px] pb-[24px]'>
                                <span onClick={handleClose} className='min-h-[64px] flex flex-col justify-center pt-[10px]'><IoMdClose /></span>
                                <div className='mb-[32px]'>
                                    <span className='text-[26px] font-semibold '>
                                        Address
                                    </span>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className={`w-[100%]  ${item === "country" ? '' : 'border border-t-[#b0b0b0] border-x-[#b0b0b0] rounded-lg'}`}>
                                        <FormInput

                                            name="country"
                                            title={"Country"}
                                            setValue={handleChange}
                                            type='text'
                                            value={mapData?.country}
                                            item={item}
                                            setItem={setItem}
                                        />
                                    </div>
                                    <div className={`flex flex-col w-[100%]  border border-t-[#b0b0b0] border-x-[#b0b0b0]  rounded-lg overflow-hidden`}>
                                        <FormInput

                                            title="Street address"
                                            name="street_address"
                                            setValue={handleChange}
                                            type='text'
                                            item={item}
                                            value={mapData?.street_address}
                                            setItem={setItem}
                                        />
                                        <FormInput

                                            title="Apt,floor,bldg (if applicable)"
                                            name="address_extra"
                                            setValue={handleChange}
                                            type='text'
                                            item={item}
                                            setItem={setItem}
                                            value={mapData?.address_extra}
                                        />
                                        <FormInput

                                            title="City/town/village (if applicable)"
                                            name="locality"
                                            setValue={handleChange}
                                            type='text'
                                            value={mapData?.locality}
                                            item={item}
                                            setItem={setItem}
                                        />
                                        <FormInput

                                            title="Province / state / territory (if applicable)"
                                            name="place"
                                            setValue={handleChange}
                                            type='text'
                                            value={mapData?.place}
                                            item={item}
                                            setItem={setItem}
                                        />
                                        <FormInput

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

                            <div className='flex justify-end px-[24px] pb-[24px]'>
                                <button
                                    onClick={handleSave}
                                    className='py-[14px] px-[24px] bg-black text-white rounded-[8px]'>
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className='h-[400px] w-[700px]'>
                        <Map
                            ref={mapRef}
                            initialViewState={{
                                longitude: lng,
                                latitude: lat,
                                zoom: 12
                            }}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            mapboxAccessToken={mapboxToken}

                        >

                            <Marker
                                longitude={lng}
                                latitude={lat}
                                draggable
                                onDragEnd={(e) => dispatch(setPreLocationData({ lng: e.lngLat.lng, lat: e.lngLat.lat }))}
                            />
                            <NavigationControl position='bottom-right' />
                            <GeolocateControl position='top-left'
                                trackUserLocation
                                onGeolocate={(e) => dispatch(setPreLocationData({ lng: e.coords.longitude, lat: e.coords.latitude }))}
                            />
                            <GeocoderControl />

                        </Map>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FormAddress