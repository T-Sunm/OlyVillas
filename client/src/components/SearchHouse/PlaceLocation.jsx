import React, { useEffect, useRef } from 'react'
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../store/slices/SearchSlice';

const PlaceLocation = () => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    const { lng, lat } = useSelector((state) => state.search.locationData)
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
        <div className='flex flex-col gap-5 h-[50vh]'>
            <div className='flex flex-col gap-3 '>
                <h2 className='font-semibold text-4xl'>
                    Where do you wanna go?
                </h2>
                <p className='text-[#717171]'>
                    Find the perfect location!
                </p>
            </div>

            <div className='h-[400px] w-full'>
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
    )
}

export default PlaceLocation