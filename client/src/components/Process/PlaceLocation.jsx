import React, { useEffect, useRef } from 'react'
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../store/slices/ProcessSlice';
const PlaceLocation = () => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    const { lng, lat } = useSelector((state) => state.CreateProcess.locationData)
    const dispatch = useDispatch()
    const mapRef = useRef()

    useEffect(() => {
        if (!lng && !lat) {
            fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=5c7e4b2ea1384604b60c8d994108fff1')
                .then(res => {
                    console.log(res)
                    return res.json()
                }).then(data => {
                    mapRef.current.flyTo({
                        center: [data.longitude, data.latitude]
                    })
                    dispatch(setLocation({ lng: data.longitude, lat: data.latitude }))
                })
        }
    }, [])
    return (
        <div className=' h-[70vh] phone:px-[20px] phone:gap-4 desktop:gap-10'>
            <div className='h-[100%] overflow-auto gap-3 flex flex-col items-center justify-center'>
                <h2 className='font-semibold laptop:text-[32px] phone:text-[26px] '>
                    Which of these best describes your place
                </h2>
                <p className='text-[#717171]'>
                    Your address is only shared with guests after they've
                    made a reservation
                </p>
                <div className='h-[400px] w-[100%]'>
                    <Map
                        ref={mapRef}
                        initialViewState={{
                            longitude: lng,
                            latitude: lat,
                            zoom: 10
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken={mapboxToken}
                    >

                        <Marker
                            longitude={lng}
                            latitude={lat}
                            draggable
                            onDragEnd={(e) => dispatch(setLocation({ lng: e.lngLat.lng, lat: e.lngLat.lat }))}
                        />
                        <NavigationControl position='bottom-right' />
                        <GeolocateControl position='top-left'
                            trackUserLocation
                            onGeolocate={(e) => dispatch(setLocation({ lng: e.coords.longitude, lat: e.coords.latitude }))}
                        />
                        <GeocoderControl />
                    </Map>
                </div>
            </div>
        </div>
    )
}

export default PlaceLocation