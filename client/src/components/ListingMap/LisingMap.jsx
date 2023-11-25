import React, { useMemo } from 'react'
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
const LisingMap = ({ mapLocation }) => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    const pins = useMemo(() => {

        return (
            <Marker
                longitude={mapLocation.lng}
                latitude={mapLocation.lat}
            />
        )
    }, [mapLocation])

    return (
        <div className='h-96 w-full'>
            <Map initialViewState={{
                longitude: mapLocation.lng,
                latitude: mapLocation.lat,
                zoom: 13
            }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={mapboxToken}>
                {pins}
            </Map>
        </div>
    )
}

export default LisingMap