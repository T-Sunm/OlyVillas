import React, { useRef, useState } from 'react'
import FormInput from '../../FormInput/FormInput'
import { IoMdClose } from "react-icons/io"
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import { useSelector } from 'react-redux';

const FormAddress = ({ toggle, setToggle }) => {
    const mapRef = useRef()
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    const { lng, lat } = useSelector((state) => state.CreateProcess.locationData)
    const [item, setItem] = useState('')
    return (
        <div className='relative z-50'>
            <div className='fixed inset-0 bg-gray-300 opacity-75'></div>
            <div className='fixed inset-0 z-10 overscroll-y-auto'>
                <div className='flex  min-h-full justify-center items-center '>
                    <div className=' flex flex-col h-full overflow-auto no-scrollbar pt-5 '>
                        <div className='bg-white flex flex-col w-[550px] rounded-[12px]'>
                            <div className='px-[24px] pb-[24px]'>
                                <span onClick={() => setToggle(false)} className='min-h-[64px] flex flex-col justify-center pt-[10px]'><IoMdClose /></span>
                                <div className='mb-[32px]'>
                                    <span className='text-[26px] font-semibold '>
                                        Address
                                    </span>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className={`w-[100%]  ${item === "country" ? '' : 'border border-t-[#b0b0b0] border-x-[#b0b0b0] rounded-lg'}`}>
                                        <FormInput
                                            isListing
                                            name="country"
                                            title={"Country"}
                                            // setValue={handleChange}
                                            type='text'
                                            // value={mapData?.country}
                                            item={item}
                                            setItem={setItem}
                                        />
                                    </div>
                                    <div className={`flex flex-col w-[100%]  border border-t-[#b0b0b0] border-x-[#b0b0b0]  rounded-lg overflow-hidden`}>
                                        <FormInput
                                            isListing
                                            title="Street address"
                                            name="street_address"
                                            // setValue={handleChange}
                                            type='text'
                                            item={item}
                                            setItem={setItem}
                                        />
                                        <FormInput
                                            isListing
                                            title="Apt,floor,bldg (if applicable)"
                                            name="address_extra"
                                            // setValue={handleChange}
                                            type='text'
                                            item={item}
                                            setItem={setItem}
                                        />
                                        <FormInput
                                            isListing
                                            title="City/town/village (if applicable)"
                                            name="locality"
                                            // setValue={handleChange}
                                            type='text'
                                            // value={mapData?.locality}
                                            item={item}
                                            setItem={setItem}
                                        />
                                        <FormInput
                                            isListing
                                            title="Province / state / territory (if applicable)"
                                            name="place"
                                            // setValue={handleChange}
                                            type='text'
                                            // value={mapData?.place}
                                            item={item}
                                            setItem={setItem}
                                        />
                                        <FormInput
                                            isListing
                                            title="Postal code (if applicable)"
                                            name="postcode"
                                            // setValue={handleChange}
                                            type='text'
                                            // value={mapData?.postcode}
                                            item={item}
                                            setItem={setItem}
                                        />

                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end px-[24px] pb-[24px]'>
                                <button className='py-[14px] px-[24px] bg-black text-white rounded-[8px]'>
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className='h-[400px] w-[700px]'>
                        <Map
                            ref={mapRef}
                            initialViewState={{
                                longitude: 108.206230,
                                latitude: 16.047079,
                                zoom: 12
                            }}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            mapboxAccessToken={mapboxToken}

                        >

                            <Marker
                                longitude={108.206230}
                                latitude={16.047079}
                                draggable
                            // onDragEnd={(e) => dispatch(setLocation({ lng: e.lngLat.lng, lat: e.lngLat.lat }))}
                            />
                            <NavigationControl position='bottom-right' />
                            <GeolocateControl position='top-left'
                                trackUserLocation
                            // onGeolocate={(e) => dispatch(setLocation({ lng: e.coords.longitude, lat: e.coords.latitude }))}
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